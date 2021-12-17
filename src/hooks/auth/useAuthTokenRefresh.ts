import { useEffect, useMemo } from 'react';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { useApiToken, ApiToken } from 'hooks/auth/useApiToken';
import { useLogout } from './useLogout';
import { hashCognitoSecret } from 'shared/util';

export function useAutoTokenRefresh() {
	const region: string = process.env.REACT_APP_REGION || '';
	const clientId: string = process.env.REACT_APP_CLIENT_ID || '';
	const clientSecret: string = process.env.REACT_APP_CLIENT_SECRET || '';

	const provider = useMemo(() => new CognitoIdentityProvider({ region }), [region]);

	const [apiToken, setApiToken] = useApiToken();
	const logout = useLogout();

	useEffect(() => {
		const originalFetch = global.fetch;
		global.fetch = async (url: RequestInfo, config?: RequestInit): Promise<Response> => {
			const response = await originalFetch(url, config);

			let newAuthToken: ApiToken | null = null;

			const UNAUTHORIZED_STATUS_CODE = 401;
			if (response.status === UNAUTHORIZED_STATUS_CODE) {
				if (!apiToken?.RefreshToken) {
					logout();
					return response;
				}

				const params = {
					ClientId: clientId,
					AuthFlow: 'REFRESH_TOKEN_AUTH',
					AuthParameters: {
						REFRESH_TOKEN: apiToken.RefreshToken,
						SECRET_HASH: hashCognitoSecret(clientSecret, apiToken.username, clientId),
					},
				};

				try {
					const res = await provider.initiateAuth(params);
					newAuthToken = {
						AccessToken: res.AuthenticationResult?.AccessToken,
						RefreshToken: apiToken.RefreshToken,
						username: apiToken.username,
					};
					setApiToken(newAuthToken);
				} catch (e) {
					console.log('token refresh error', e);
					logout();
				}

				if (newAuthToken) {
					const newHeaders = new Headers(config?.headers);
					newHeaders.set('Authorization', `Bearer ${newAuthToken.AccessToken}`);

					return originalFetch(url, {
						...config,
						headers: newHeaders,
					});
				}
			}

			return response;
		};

		return () => {
			global.fetch = originalFetch;
		};
	}, [apiToken, setApiToken, logout, clientId, provider, clientSecret]);
}

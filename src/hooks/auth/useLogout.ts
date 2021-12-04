import { useCallback } from 'react';

import { ApiToken, useApiToken } from 'hooks/auth/useApiToken';

export function useSafeReplaceToken() {
	const [, setApiToken] = useApiToken();
	return useCallback(
		(newToken: ApiToken | null = null) => {
			setApiToken(newToken);
		},
		[setApiToken],
	);
}

export function useLogout() {
	const safeReplaceToken = useSafeReplaceToken();
	return useCallback(() => safeReplaceToken(null), [safeReplaceToken]);
}

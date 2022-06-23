import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import path from 'path';
import Typography from '@mui/material/Typography';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { appPaths } from 'App.routes';
import { Form, WButton, WTextField, GridCenter, WLink } from './Login.styles';
import { Container, LinearProgress } from '@mui/material';
import { useApiToken } from 'hooks/auth/useApiToken';
import { hashCognitoSecret } from 'shared/util';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';

export default function SignIn() {
	const region: string = process.env.REACT_APP_REGION || '';
	const clientId: string = process.env.REACT_APP_CLIENT_ID || '';
	const clientSecret: string = process.env.REACT_APP_CLIENT_SECRET || '';
	const provider = new CognitoIdentityProvider({ region });

	const navigate = useNavigate();
	const userError = useSnackbarOnError();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isCognitoLoading, setIsCognitoLoading] = useState<boolean>(false);

	const [, setApiToken] = useApiToken();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsCognitoLoading(true);

		const params = {
			ClientId: clientId,
			AuthFlow: 'USER_PASSWORD_AUTH',
			AuthParameters: {
				USERNAME: email,
				PASSWORD: password,
				SECRET_HASH: hashCognitoSecret(clientSecret, email, clientId),
			},
		};

		try {
			const res = await provider.initiateAuth(params);

			setApiToken({
				AccessToken: res.AuthenticationResult?.AccessToken,
				RefreshToken: res.AuthenticationResult?.RefreshToken,
				username: email,
			});
		} catch (e) {
			userError(e);
		}

		setIsCognitoLoading(false);

		navigate(path.join(appPaths.auth.path, appPaths.auth.subPaths.login));
	};

	return (
		<>
			{isCognitoLoading && <LinearProgress />}
			<Container>
				<GridCenter>
					<Typography variant='h5'>Sign in</Typography>
					<Form>
						<WTextField
							required
							label='Email Address'
							value={email}
							type={'email'}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
						/>
						<WTextField
							required
							label='Password'
							value={password}
							type={'password'}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
						/>
						<WButton onClick={handleSubmit}>Sign In</WButton>
					</Form>
					<WLink to={path.join('/', appPaths.auth.path, appPaths.auth.subPaths.register)}>
						Don&apos;t have an account? Sign Up
					</WLink>
				</GridCenter>
			</Container>
		</>
	);
}

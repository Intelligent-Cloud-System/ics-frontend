import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import path from 'path';

import { Form, WButton, WTextField, GridCenter, WLink } from './Registration.styles';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';
import { RegisterUserRequest, UserService } from 'clients/CoreService';
import { hashCognitoSecret } from 'shared/util';
import { appPaths } from 'App.routes';

export default function SignIn() {
	const region: string = process.env.REACT_APP_REGION || '';
	const clientId: string = process.env.REACT_APP_CLIENT_ID || '';
	const clientSecret: string = process.env.REACT_APP_CLIENT_SECRET || '';
	const provider = new CognitoIdentityProvider({ region });

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isCognitoLoading, setIsCognitoLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const userError = useSnackbarOnError();

	const { mutate: registerUser } = useMutation(
		[],
		(user: RegisterUserRequest) => {
			return UserService.register(user);
		},
		{
			onError: useSnackbarOnError(),
			onSuccess: () => navigate(path.join(appPaths.auth.path, appPaths.auth.subPaths.login)),
		},
	);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsCognitoLoading(true);

		const params = {
			ClientId: clientId,
			Password: password,
			Username: email,
			SecretHash: hashCognitoSecret(clientSecret, email, clientId),
			UserAttributes: [
				{
					Name: 'email',
					Value: email,
				},
			],
		};

		try {
			await provider.signUp(params);
			registerUser({ firstName, lastName, email });
		} catch (e) {
			userError(e);
		}

		setIsCognitoLoading(false);
	};

	return (
		<>
			{isCognitoLoading && <LinearProgress />}
			<Container>
				<GridCenter>
					<Typography variant='h5'>Sign Up</Typography>
					<Form>
						<WTextField
							required
							label='First Name'
							value={firstName}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
						/>
						<WTextField
							required
							label='Last Name'
							value={lastName}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
						/>
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
						<WButton onClick={handleSubmit}>Sign Up</WButton>
					</Form>
					<WLink to={path.join('/', appPaths.auth.path, appPaths.auth.subPaths.login)}>
						Already have an account? Sign In
					</WLink>
				</GridCenter>
			</Container>
		</>
	);
}

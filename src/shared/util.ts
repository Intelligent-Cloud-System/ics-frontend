import crypto from 'crypto';

export const hashCognitoSecret = (clientSecret: string, username: string, clientId: string) => {
	return crypto
		.createHmac('SHA256', clientSecret)
		.update(username + clientId)
		.digest('base64');
};

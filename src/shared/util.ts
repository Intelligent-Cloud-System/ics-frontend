import crypto from 'crypto';

export const hashCognitoSecret = (clientSecret: string, username: string, clientId: string) => {
	return crypto
		.createHmac('SHA256', clientSecret)
		.update(username + clientId)
		.digest('base64');
};

export const getBasename = (str: string, sep = '/'): string => {
	const index = str.lastIndexOf(sep);
	const basename = str.slice(index + 1);
	if (!basename && index + 1 === str.length) return getBasename(str.slice(0, index), sep);
	return basename;
};

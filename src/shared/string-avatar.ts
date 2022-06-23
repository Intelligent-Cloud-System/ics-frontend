import crypto from 'crypto';

function stringToColor(str: string) {
	return '#' + crypto.createHash('SHA256').update(str).digest('hex').slice(0, 6);
}

export function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
}

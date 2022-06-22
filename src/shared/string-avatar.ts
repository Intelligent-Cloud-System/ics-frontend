import { UserService } from 'clients/CoreService';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

/**
 * Upload file to S3 with previously received pre-signed POST data.
 * @param postUrl
 * @param file
 * @returns {Promise<void>}
 */
export const GetUserIconUrl = (id: number): string => {
	const { data: content, isLoading: isContentLoading } = useQuery('users/icon', () =>
		UserService.getUserIcon(id),
	);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const url = useMemo(() => content?.url || '', [isContentLoading]);

	return url;
};

export function stringAvatar(name: string, id: string) {
	return {
		sx: {
			backgroundImage: `url(${GetUserIconUrl(parseInt(id))})`,
			backgroundSize: 'contain',
		},
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
}

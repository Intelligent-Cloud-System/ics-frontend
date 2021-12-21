import React, { createContext, FC, useContext } from 'react';
import { useQuery } from 'react-query';
import LinearProgress from '@mui/material/LinearProgress';

import { useApiToken } from 'hooks/auth/useApiToken';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';
import { UserResponse, UserService } from 'clients/CoreService';

export const UserContext = createContext<UserResponse | null>(null);

export const useRole = () => {
	return useContext(UserContext)?.role;
};

export const UserContextProvider: FC = ({ children }) => {
	const [apiToken] = useApiToken();

	const { data } = useQuery([apiToken], () => UserService.currentUser(), {
		enabled: !!apiToken,
		keepPreviousData: true,
		onError: useSnackbarOnError(),
		refetchOnWindowFocus: false,
	});

	return apiToken && !data ? (
		<LinearProgress />
	) : (
		<UserContext.Provider value={apiToken ? data || null : null}>{children}</UserContext.Provider>
	);
};

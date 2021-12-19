import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { AppRoutes } from 'App.routes';
import { useAutoTokenRefresh } from 'hooks/auth/useAuthTokenRefresh';
import { SnackbarProvider } from 'hooks/notification/snackbar.provider';
import { OpenAPI as CoreOpenAPi } from 'clients/CoreService';
import { UserContextProvider } from 'context/UserContext';
import UserProfile from 'pages/UserProfile';

CoreOpenAPi.BASE = process.env.REACT_APP_CORE_URL as string;

function App() {
	useAutoTokenRefresh();

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<StyledEngineProvider injectFirst>
				<SnackbarProvider>
					{/* <UserContextProvider> */}
					<UserProfile />
					{/* </UserContextProvider> */}
				</SnackbarProvider>
			</StyledEngineProvider>
		</QueryClientProvider>
	);
}

export default App;

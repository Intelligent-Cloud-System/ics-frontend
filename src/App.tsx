import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { AppRoutes } from 'App.routes';
import { useAutoTokenRefresh } from 'hooks/auth/useAuthTokenRefresh';
import { SnackbarProvider } from 'hooks/notification/snackbar.provider';
import { UserContextProvider } from 'context/UserContext';

function App() {
	useAutoTokenRefresh();

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<StyledEngineProvider injectFirst>
				<SnackbarProvider>
					<UserContextProvider>
						<AppRoutes />
					</UserContextProvider>
				</SnackbarProvider>
			</StyledEngineProvider>
		</QueryClientProvider>
	);
}

export default App;

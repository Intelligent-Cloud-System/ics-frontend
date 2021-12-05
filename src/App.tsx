import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { AppRoutes } from 'App.routes';
import { useAutoTokenRefresh } from 'hooks/auth/useAuthTokenRefresh';
import { SnackbarProvider } from 'hooks/notification/snackbar.provider';

function App() {
	useAutoTokenRefresh();

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<StyledEngineProvider injectFirst>
				<SnackbarProvider>
					<AppRoutes />
				</SnackbarProvider>
			</StyledEngineProvider>
		</QueryClientProvider>
	);
}

export default App;

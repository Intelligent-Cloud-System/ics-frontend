import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { AppRoutes } from 'App.routes';
import { useAutoTokenRefresh } from 'hooks/auth/useAuthTokenRefresh';
import { SnackbarProvider } from 'hooks/notification/snackbar.provider';
import { OpenAPI as CoreOpenAPi } from 'clients/CoreService';
import { UserContextProvider } from 'context/UserContext';
import theme from 'themes';

CoreOpenAPi.BASE = process.env.REACT_APP_CORE_URL as string;

function App() {
	useAutoTokenRefresh();

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<StyledThemeProvider theme={theme}>
				<StyledEngineProvider injectFirst>
					<MuiThemeProvider theme={theme}>
						<SnackbarProvider>
							<UserContextProvider>
								<AppRoutes />
							</UserContextProvider>
						</SnackbarProvider>
					</MuiThemeProvider>
				</StyledEngineProvider>
			</StyledThemeProvider>
		</QueryClientProvider>
	);
}

export default App;

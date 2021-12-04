import React from 'react';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { AppRoutes } from 'App.routes';
import { useAutoTokenRefresh } from 'hooks/auth/useAuthTokenRefresh';
import { SnackbarProvider } from 'hooks/notification/snackbar.provider';

function App() {
	useAutoTokenRefresh();

	return (
		<>
			<StyledEngineProvider injectFirst>
				<SnackbarProvider>
					<AppRoutes />
				</SnackbarProvider>
			</StyledEngineProvider>
		</>
	);
}

export default App;

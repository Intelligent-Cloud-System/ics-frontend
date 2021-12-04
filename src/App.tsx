import React from 'react';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { AppRoutes } from 'App.routes';
import { useAutoTokenRefresh } from 'hooks/auth/useAuthTokenRefresh';

function App() {
	useAutoTokenRefresh();

	return (
		<>
			<StyledEngineProvider injectFirst>
				<AppRoutes />
			</StyledEngineProvider>
		</>
	);
}

export default App;

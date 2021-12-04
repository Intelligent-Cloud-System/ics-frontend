import React from 'react';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { AppRoutes } from 'App.routes';
import { useAutoTokenRefresh } from 'hooks/auth/useAuthTokenRefresh';
import Navigation from 'components/navigation';

function App() {
	useAutoTokenRefresh();

	return (
		<>
			<StyledEngineProvider injectFirst>
				<Navigation />
			</StyledEngineProvider>
		</>
	);
}

export default App;

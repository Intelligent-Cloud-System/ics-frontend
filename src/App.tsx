import React from 'react';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { AppRoutes } from 'App.routes';

function App() {
	return (
		<>
			<StyledEngineProvider injectFirst>
				<AppRoutes />
			</StyledEngineProvider>
		</>
	);
}

export default App;

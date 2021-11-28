import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';

const GlobalStyle = createGlobalStyle`
  body {
	margin: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
			<GlobalStyle />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);

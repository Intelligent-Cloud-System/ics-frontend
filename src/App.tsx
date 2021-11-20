import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// components
import Home from 'pages/Home';
import Login from 'pages/Login';

function App() {
	return (
		<>
			<main className='content_wrapper'>
				<Switch>
					<Route path='/home'>
						<Home />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='*'>
						<Redirect to='/home' />
					</Route>
				</Switch>
			</main>
		</>
	);
}

export default App;

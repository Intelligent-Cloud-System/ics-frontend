import { Outlet } from 'react-router';
import { Fragment } from 'react';

import Navigation from 'components/Navigation';

export function NavbarWrapper() {
	return (
		<Fragment>
			<Navigation />
			<Outlet />
		</Fragment>
	);
}

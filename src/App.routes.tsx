import { Route, Navigate, Outlet } from 'react-router';
import React, { memo, Suspense } from 'react';
import { Routes } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { NavbarWrapper } from 'components/NavbarWrapper';
import { useRole } from './context/UserContext';

interface RoutesConfig {
	path: string;
	element: React.ReactElement;
	children?: RoutesConfig[];
	allowedRoles?: string[];
}

const LazyLogin = React.lazy(() => import('pages/Login'));
const LazyRegistration = React.lazy(() => import('pages/Registration'));
const LazyUpload = React.lazy(() => import('pages/FilesPage'));

export const appPaths = {
	auth: {
		path: 'auth',
		subpaths: {
			login: 'login',
			register: 'register',
		},
	},
	files: {
		path: 'files',
	},
};

const NO_ROLE = 'NO_ROLE';
const allRoutes: RoutesConfig[] = [
	{
		allowedRoles: [NO_ROLE],
		path: appPaths.auth.path,
		element: <Outlet />,
		children: [
			{ path: appPaths.auth.subpaths.login, element: <LazyLogin /> },
			{ path: appPaths.auth.subpaths.register, element: <LazyRegistration /> },
			{ path: 'files', element: <LazyUpload /> },
		],
	},
	{
		allowedRoles: ['User'],
		path: '',
		element: <NavbarWrapper />,
		children: [{ path: appPaths.files.path, element: <LazyUpload /> }],
	},
];

export const homePaths: {
	[role: string]: string;
} = {
	[NO_ROLE]: 'auth/login',
	User: 'files',
};

function genRoutes(routes: RoutesConfig[], role: string) {
	return routes
		.filter(({ allowedRoles }) => {
			if (!allowedRoles) return true;
			return allowedRoles.includes(role);
		})
		.map(({ path, element, children }) => {
			const suspendedElement = <Suspense fallback={<LinearProgress />}>{element}</Suspense>;

			return children ? (
				<Route key={path} path={path} element={suspendedElement}>
					{genRoutes(children, role)}
				</Route>
			) : (
				<Route key={path} path={path} element={suspendedElement} />
			);
		});
}

const AuthRoutes = memo(({ role = NO_ROLE }: { role?: string }) => {
	return (
		<Routes>
			{genRoutes(allRoutes, role)}
			<Route path={'*'} element={<Navigate to={homePaths[role]} />} />
		</Routes>
	);
});

export function AppRoutes() {
	return <AuthRoutes role={useRole()} />;
}

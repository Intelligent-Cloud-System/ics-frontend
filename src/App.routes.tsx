import { Route, Navigate, Outlet } from 'react-router';
import React, { memo, Suspense } from 'react';
import { Routes } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import path from 'path';

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
const LazyUserProfile = React.lazy(() => import('pages/UserProfile'));

export const appPaths = {
	auth: {
		path: 'auth',
		subPaths: {
			login: 'login',
			register: 'register',
		},
	},
	files: {
		path: 'files',
	},
	profile: {
		path: 'profile',
		subPaths: {
			settings: 'settings',
		},
	},
};

const NO_ROLE = 'NO_ROLE';
const allRoutes: RoutesConfig[] = [
	{
		allowedRoles: [NO_ROLE],
		path: appPaths.auth.path,
		element: <Outlet />,
		children: [
			{ path: appPaths.auth.subPaths.login, element: <LazyLogin /> },
			{ path: appPaths.auth.subPaths.register, element: <LazyRegistration /> },
		],
	},
	{
		allowedRoles: ['User'],
		path: '',
		element: <NavbarWrapper />,
		children: [
			{ path: appPaths.files.path, element: <LazyUpload /> },
			{
				path: path.join(appPaths.profile.path, appPaths.profile.subPaths.settings),
				element: <LazyUserProfile />,
			},
		],
	},
];

export const homePaths: {
	[role: string]: string;
} = {
	[NO_ROLE]: path.join(appPaths.auth.path, appPaths.auth.subPaths.login),
	User: appPaths.files.path,
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

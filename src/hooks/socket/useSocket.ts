import { io, Socket } from 'socket.io-client';
import { DependencyList, useEffect, useMemo } from 'react';

import { useSharedState } from 'hooks/state/useSharedState';
import { useApiToken } from 'hooks/auth/useApiToken';
import { OpenAPI } from 'clients/CoreService';

type SocketEventListener = {
	type: string;
	listener: (...args: any[]) => any;
};

class SocketSingleton {
	// synchronous lock to prevent multiple parallel socket creations
	public static isConnecting = false;
}

export default function useSocket(
	plainListeners?: SocketEventListener[],
	deps: DependencyList = [],
): Socket | null {
	// eslint-disable-next-line
	const listeners = useMemo(() => plainListeners, deps);

	const [apiToken] = useApiToken();
	const accessToken = apiToken?.AccessToken;

	const [socket, setSocket] = useSharedState<Socket | null>('SOCKET', null);

	const socketRef = useMemo<{ socket: Socket | null }>(() => ({ socket: null }), []);
	socketRef.socket = socket;

	useEffect(() => {
		if (!accessToken || socketRef.socket?.connected || SocketSingleton.isConnecting) {
			return;
		}

		SocketSingleton.isConnecting = true;

		const newSocket = io(OpenAPI.BASE, {
			path: '/socket',
			auth: { accessToken },
			query: {
				accessToken,
			},
		});

		newSocket.on('connect', () => {
			setSocket(newSocket);
			SocketSingleton.isConnecting = false;
		});
		newSocket.on('disconnect', () => {
			setSocket(null);
			SocketSingleton.isConnecting = false;
		});

		return () => {
			SocketSingleton.isConnecting = false;
			setSocket(null);
			newSocket.disconnect();
			newSocket.listenersAny().forEach(l => newSocket.offAny(l));
		};
	}, [socketRef, accessToken, setSocket]);

	useEffect(() => {
		listeners?.forEach(({ type, listener }) => socket?.on(type, listener));
		return () => listeners?.forEach(({ type, listener }) => socket?.off(type, listener));
	}, [socket, listeners]);

	return socket;
}

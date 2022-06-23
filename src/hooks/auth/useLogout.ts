import { useCallback } from 'react';

import { useApiToken } from 'hooks/auth/useApiToken';

export function useLogout() {
	const [, setApiToken] = useApiToken();
	return useCallback(() => setApiToken(null), [setApiToken]);
}

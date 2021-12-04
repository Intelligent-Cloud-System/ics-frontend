import {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

export class SharedStateStore<T> {
	public static instance = new SharedStateStore();
	private constructor() {}

	private readonly state: Record<string, T> = {};
	private readonly listeners: Record<string, ((newValue: T) => void | any)[]> = {};

	get(constant: string): T {
		return this.state[constant];
	}

	subscribe(constant: string, listener: (newValue: T) => any | void): void {
		if (!this.listeners[constant]) {
			this.listeners[constant] = [];
		}

		this.listeners[constant].push(listener);
	}

	unsubscribe(constant: string, listener: (newValue: T) => any | void) {
		if (this.listeners[constant]) {
			this.listeners[constant] = this.listeners[constant].filter(
				newListener => newListener !== listener,
			);
		}
	}

	dispatch(constant: string, newValue: T): void {
		this.state[constant] = newValue;
		this.listeners[constant]?.forEach(listener => listener(newValue));
	}
}

export const SharedStateContext = createContext<SharedStateStore<any>>(SharedStateStore.instance);

export function useSharedStateDispatch<T>(
	constant: string,
	onChange?: Dispatch<T>,
): Dispatch<SetStateAction<T>> {
	const sharedState = useContext(SharedStateContext);

	return useCallback(
		(valueOrOnChange: SetStateAction<T>) => {
			const newValue =
				typeof valueOrOnChange === 'function'
					? (valueOrOnChange as (prevState: T) => T)(sharedState.get(constant))
					: valueOrOnChange;

			onChange?.(newValue);
			sharedState.dispatch(constant, newValue);
		},
		[constant, sharedState, onChange],
	);
}

export function useSharedStateValue<T>(constant: string, defaultValue?: T): T {
	const sharedState = useContext(SharedStateContext);
	const [value, setValue] = useState<T>(sharedState.get(constant) ?? defaultValue);

	useEffect(() => {
		if (sharedState.get(constant) === undefined && defaultValue !== undefined) {
			sharedState.dispatch(constant, defaultValue);
		}

		sharedState.subscribe(constant, setValue);
		return () => sharedState.unsubscribe(constant, setValue);
	}, [constant, sharedState, setValue, defaultValue]);

	return value;
}

export type SharedStateReturn<T> = [T, Dispatch<SetStateAction<T>>];

export function useSharedState<T>(
	constant: string,
	defaultValue?: T,
	onChange?: Dispatch<T>,
): SharedStateReturn<T> {
	const value = useSharedStateValue<T>(constant, defaultValue);
	const dispatch = useSharedStateDispatch<T>(constant, onChange);
	return [value, dispatch];
}

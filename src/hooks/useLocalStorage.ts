import { parseJSON } from "@coven/parsers";
import { is, isFunction } from "@coven/predicates";
import type { JSONValue, Nullary } from "@coven/types";
import {
	type Dispatch,
	type StateUpdater,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "preact/hooks";

/**
 * Like `useState` but for localStorage data. Keeps in sync accross tabs with the
 * "storage" event.
 */
export const useLocalStorage = <State extends JSONValue>(
	key: string,
	initialState: State | Nullary<State>,
): readonly [state: State, setState: Dispatch<StateUpdater<State>>] => {
	const [state, setState] = useState(
		parseJSON<State>(localStorage.getItem(key) ?? "") ?? initialState,
	);
	const isLocalStorageKey = useMemo(() => is(key), [key]);
	const setStateAndUpdateLocalStorage = useCallback<typeof setState>(
		(newState) =>
			setState((currentState) => {
				const value =
					isFunction(newState) ? newState(currentState) : newState;

				localStorage.setItem(key, JSON.stringify(value));

				return value;
			}),
		[],
	);

	useEffect(() => {
		const updateKey = (event: StorageEvent) =>
			isLocalStorageKey(event.key) ?
				setState(JSON.parse(event.newValue ?? ""))
			:	undefined;

		globalThis.addEventListener("storage", updateKey);

		return () => globalThis.removeEventListener("storage", updateKey);
	}, []);

	return useMemo(
		() => [state, setStateAndUpdateLocalStorage] as const,
		[state, setStateAndUpdateLocalStorage],
	);
};

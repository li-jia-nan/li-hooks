import { useCallback, useState } from 'react';
import { isFunction } from '../utils';

export type SetState<S extends Record<PropertyKey, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null)
) => void;

const useSetState = <S extends Record<PropertyKey, any>>(
  initialState: S | (() => S)
): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);
  const setMergeState = useCallback((patch: any) => {
    setState(prevState => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;

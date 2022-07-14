import { useState, useCallback } from 'react';
import { getValue, serializer } from '../utils';
import useUpdateEffect from './useUpdateEffect';

type LocalStorageStateType = readonly [any, (value?: any) => void];

const useLocalStorageState = (key: string): LocalStorageStateType => {
  const [state, setState] = useState(() => getValue(key));
  useUpdateEffect(() => {
    setState(getValue(key));
  }, [key]);
  const updateState = useCallback(
    (value?: any) => {
      if (value) {
        const currentState = serializer(value);
        if (currentState) {
          try {
            setState(currentState);
            localStorage?.setItem?.(key, currentState);
          } catch (e) {
            if (e instanceof Error) {
              throw new Error(e.message);
            }
          }
        }
      } else {
        setState(undefined);
        localStorage?.removeItem?.(key);
      }
    },
    [state, key]
  );
  return [state, updateState] as const;
};

export default useLocalStorageState;

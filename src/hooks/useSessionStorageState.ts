import { useCallback, useState } from 'react';
import { getValue, serializer } from '../utils';
import useUpdateEffect from './useUpdateEffect';

type SessionStorageStateType = readonly [any, (value?: any) => void];

const useSessionStorageState = (key: string): SessionStorageStateType => {
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
            sessionStorage?.setItem?.(key, currentState);
          } catch (e) {
            if (e instanceof Error) {
              throw new Error(e.message);
            }
          }
        }
      } else {
        setState(undefined);
        sessionStorage?.removeItem?.(key);
      }
    },
    [state, key]
  );
  return [state, updateState] as const;
};

export default useSessionStorageState;

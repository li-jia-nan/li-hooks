import { useCallback, useState } from 'react';
import useUpdateEffect from '../lifecycle/useUpdateEffect';

const serializer = <T>(value: T) => {
  try {
    return JSON.stringify(value);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
const deserializer = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
const getValue = (key: string) => {
  try {
    const raw = sessionStorage?.getItem(key);
    if (raw) {
      return deserializer(raw);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

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

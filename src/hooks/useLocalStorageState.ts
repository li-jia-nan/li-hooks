import { useState, useCallback } from 'react';
import useUpdateEffect from './useUpdateEffect';

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
    const raw = localStorage?.getItem(key);
    if (raw) {
      return deserializer(raw);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

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

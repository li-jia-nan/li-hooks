import { useCallback, useState } from 'react';

const useSetState = <T extends object>(
  initialState: T = {} as T
): readonly [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, set] = useState<T>(() => initialState);
  const setState = useCallback((patch: any) => {
    set(prevState => {
      return Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch);
    });
  }, []);
  return [state, setState] as const;
};

export default useSetState;

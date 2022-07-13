import { useCallback, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useUnmount from '../lifecycle/useUnmount';

function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useRafState<S>(initialState?: S | (() => S)) {
  const ref = useRef<number>(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: S | Dispatch<SetStateAction<S | undefined>>) => {
    cancelAnimationFrame(ref.current);
    ref.current = requestAnimationFrame(() => {
      setState(value as S);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(ref.current);
  });

  return [state, setRafState] as const;
}

export default useRafState;

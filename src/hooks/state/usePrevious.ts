import { useRef } from 'react';

export type ShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean;

const usePrevious = <T>(
  state: T,
  shouldUpdate: ShouldUpdateFunc<T> = (a?: T, b?: T) => !Object.is(a, b)
): T | undefined => {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();
  if (shouldUpdate(curRef.current, state)) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }
  return prevRef.current;
};

export default usePrevious;

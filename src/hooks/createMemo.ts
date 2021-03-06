import { useMemo } from 'react';

const createMemo = <T extends GlobalFunction>(fn: T) => {
  return (...args: Parameters<T>) => useMemo<ReturnType<T>>(() => fn(...args), args);
};

export default createMemo;

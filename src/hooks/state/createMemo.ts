import { useMemo } from 'react';

// Memo factory
const createMemo =
  <T extends GlobalFunction>(fn: T) =>
  (...args: Parameters<T>) =>
    useMemo<ReturnType<T>>(() => fn(...args), args);

export default createMemo;

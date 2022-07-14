import { useState } from 'react';
import useMemoizedFn from './useMemoizedFn';

const useSet = <K>(initialValue?: Iterable<K>) => {
  const getInitValue = (): Set<K> => {
    return initialValue === undefined ? new Set<K>() : new Set<K>(initialValue);
  };

  const [set, setSet] = useState<Set<K>>(getInitValue);

  const add = (key: K): void => {
    if (set.has(key)) {
      return;
    }
    setSet(prevSet => {
      const temp = new Set<K>(prevSet);
      temp.add(key);
      return temp;
    });
  };

  const remove = (key: K): void => {
    if (!set.has(key)) {
      return;
    }
    setSet(prevSet => {
      const temp = new Set<K>(prevSet);
      temp.delete(key);
      return temp;
    });
  };

  const reset = (): void => {
    setSet(getInitValue());
  };

  return [
    set,
    { add: useMemoizedFn(add), remove: useMemoizedFn(remove), reset: useMemoizedFn(reset) },
  ] as const;
};

export default useSet;

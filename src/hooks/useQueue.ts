import { useState } from 'react';

export interface QueueMethods<T> {
  add: (item: T) => void;
  remove: () => void;
  reset: () => void;
  first: T;
  last: T;
  size: number;
}

const useQueue = <T>(initialValue: T[] = []): QueueMethods<T> => {
  const [queue, setQueue] = useState<T[]>(initialValue);
  return {
    add(value) {
      setQueue(q => [...q, value]);
    },
    remove() {
      setQueue(([first, ...rest]) => rest);
    },
    reset() {
      setQueue(initialValue);
    },
    get first() {
      return queue[0];
    },
    get last() {
      return queue[queue.length - 1];
    },
    get size() {
      return queue.length;
    },
  };
};

export default useQueue;

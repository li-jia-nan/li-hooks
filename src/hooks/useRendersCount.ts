import { useRef } from 'react';

const useRendersCount = (): number => {
  return ++useRef<number>(0).current;
};

export default useRendersCount;

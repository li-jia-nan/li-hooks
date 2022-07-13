import { useRef } from 'react';

const useFirstMount = (): boolean => {
  const isFirst = useRef<boolean>(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
};

export default useFirstMount;

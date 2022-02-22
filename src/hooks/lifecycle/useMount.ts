import { useEffect } from 'react';

const useMount = (fn: () => void): void => {
  useEffect(() => {
    fn();
  }, []);
};

export default useMount;

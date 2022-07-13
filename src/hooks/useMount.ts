import { useEffect } from 'react';
import { isFunction } from 'lodash';

const useMount = (fn: () => void): void => {
  if (process.env.NODE_ENV === 'development') {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
      );
    }
  }
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;

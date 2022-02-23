import { useEffect, useRef } from 'react';
import { isBrowser } from '../../utils';
import useUnmount from '../lifecycle/useUnmount';

export interface Options {
  restoreOnUnmount?: boolean;
}

const def: Options = {
  restoreOnUnmount: false,
};

const useTitle = (title: string, options: Options = def): void => {
  const titleRef = useRef<string>(isBrowser ? document.title : '');
  useEffect(() => {
    document.title = title;
  }, [title]);
  useUnmount(() => {
    if (options.restoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
};

export default useTitle;

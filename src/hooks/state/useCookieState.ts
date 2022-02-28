import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

const useCookieState = (cookieKey: string, defaultValue?: string | undefined) => {
  const [state, setState] = useState<string | undefined>(() => {
    const cookieValue = Cookies.get(cookieKey);
    if (cookieValue && typeof cookieValue === 'string') {
      return cookieValue;
    }
    return defaultValue;
  });
  const updateState = useCallback(
    (newCookieValue?: string | undefined, newOptions: Cookies.CookieAttributes = {}) => {
      setState(() => {
        if (newCookieValue) {
          Cookies.set(cookieKey, newCookieValue, newOptions);
        } else {
          Cookies.remove(cookieKey);
        }
        return newCookieValue;
      });
    },
    []
  );
  return [state, updateState] as const;
};

export default useCookieState;

import { useEffect, useRef } from 'react';

const useUnmount = (destructor: ReturnType<Parameters<typeof useEffect>[0]>): void => {
  const fnRef = useRef(destructor);
  fnRef.current = destructor;
  useEffect(
    () => () => {
      fnRef?.current?.();
    },
    []
  );
};

export default useUnmount;

import { useCallback, useState } from 'react';

const useUpdate = (): (() => void) => {
  const [, update] = useState({});

  return useCallback(() => {
    update({});
  }, []);
};

export default useUpdate;

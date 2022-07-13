import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, update] = useState<any[]>([]);

  return useCallback(() => {
    update([]);
  }, []);
};

export default useUpdate;

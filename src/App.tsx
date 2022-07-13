import React, { useState } from 'react';
import useUpdateEffect from './hooks/useUpdateEffect';
import useSessionStorageState from './hooks/useSessionStorageState';

const App: React.FC = () => {
  const [state, updateState] = useSessionStorageState('fuck');
  const [num, updateNum] = useState<number>(0);
  useUpdateEffect(() => {
    updateState();
  }, [num]);
  return <div onClick={() => updateNum(num + 1)}>{num}</div>;
};

export default App;

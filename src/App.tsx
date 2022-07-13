import React, { useState } from 'react';
import useUpdateEffect from './hooks/lifecycle/useUpdateEffect';
import useSessionStorageState from './hooks/lifecycle/useSessionStorageState';

const App: React.FC = () => {
  const [state, updateState] = useSessionStorageState('fuck');
  const [num, updateNum] = useState<number>(0);
  useUpdateEffect(() => {
    updateState();
  }, [num]);
  return <div onClick={() => updateNum(num + 1)}>{num}</div>;
};

export default App;

import React from 'react';
import useLocalStorageState from './hooks/state/useLocalStorageState';

const App: React.FC = () => {
  const [, updateState] = useLocalStorageState('fuck');
  React.useEffect(() => {
    updateState([1, 2, 3, 4]);
  }, []);
  return null;
};

export default App;

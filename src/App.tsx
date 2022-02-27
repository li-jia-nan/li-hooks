import React from 'react';
import createMemo from './hooks/state/createMemo';
import './App.css';

const Fibonacci = (n: number, ac1: number = 1, ac2: number = 1): number => {
  if (n <= 1) {
    return ac2;
  }
  return Fibonacci(n - 1, ac2, ac1 + ac2);
};

const useFibonacci = createMemo(Fibonacci);

const App: React.FC = () => {
  const num = useFibonacci(1000);
  return (
    <>
      <div className="App">{(Fibonacci(1000) === num) + ''}</div>
    </>
  );
};

export default App;

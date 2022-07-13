import { useEffect, useRef, DependencyList, EffectCallback } from 'react';
import isEqual from 'lodash/isEqual';

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []): boolean => {
  return isEqual(aDeps, bDeps);
};

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (!depsEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current++;
  }

  useEffect(effect, [signalRef.current]);
};

export default useDeepCompareEffect;

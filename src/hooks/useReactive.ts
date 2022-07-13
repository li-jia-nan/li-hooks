import { useRef, useMemo } from 'react';
import useUpdate from './useUpdate';

// k:v 原对象:代理过的对象
const proxyMap = new WeakMap();
// k:v 代理过的对象:原对象
const rawMap = new WeakMap();

const isObject = (val: Record<PropertyKey, any>): boolean => {
  return typeof val === 'object' && val !== null;
};

const observer = <T extends Record<PropertyKey, any> = Record<PropertyKey, any>>(
  initialVal: T,
  cb: () => void
): T => {
  const existingProxy = proxyMap.get(initialVal);

  if (existingProxy) {
    return existingProxy;
  }

  if (rawMap.has(initialVal)) {
    return initialVal;
  }
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return isObject(res) ? observer(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });
  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);
  return proxy;
};

const useReactive = <S extends Record<PropertyKey, any> = Record<PropertyKey, any>>(
  initialState: S
): S => {
  const update = useUpdate();
  const stateRef = useRef<S>(initialState);

  const state = useMemo(
    () =>
      observer(stateRef.current, () => {
        update();
      }),
    [stateRef.current]
  );

  return state;
};

export default useReactive;

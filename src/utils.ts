import React, { DependencyList } from 'react';
import { DomElement, DomParam, ResolvePromise } from './types';

export const nullRef: React.RefObject<any> = {
  current: null,
};

export const isBrowser = typeof window !== 'undefined' && window.document;

export const isNavigator = typeof navigator !== 'undefined';

export const isRef = <T extends DomElement = DomElement>(
  value: DomParam<T>
): value is React.RefObject<T> => {
  return value && typeof value === 'object' && value.hasOwnProperty('current');
};

export const isPromiseLike = (value: any): value is PromiseLike<any> => {
  return (
    ((typeof value === 'object' && value !== null) || typeof value === 'function') &&
    typeof value.then === 'function'
  );
};

export const isPromise = (value: any): value is Promise<any> => {
  return value instanceof Promise;
};

export const isObject = (val: any): boolean => {
  return typeof val === 'object' && val !== null;
};

export const isFunction = (fn: any): fn is Function => {
  return typeof fn === 'function';
};

export const props2Arr = <T extends GlobalObject>(obj: T): T[keyof T][] => {
  return Object.keys(obj).map(key => obj[key]);
};

export const isSameDeps = (oldDeps: DependencyList, deps: DependencyList): boolean => {
  if (oldDeps === deps) {
    return true;
  }
  for (const i in oldDeps) {
    if (oldDeps[i] !== deps[i]) {
      return false;
    }
  }
  return true;
};

export const diffTwoDeps = (oldDeps?: DependencyList, deps?: DependencyList): number[] => {
  return oldDeps
    ? oldDeps.map((_, idx) => (oldDeps[idx] !== deps?.[idx] ? idx : -1)).filter(ele => ele >= 0)
    : deps
    ? deps.map((_, idx) => idx)
    : [];
};

export const isShallowEqual = (val: any, other: any): boolean => {
  if (isObject(val) && isObject(other)) {
    const props1 = Object.getOwnPropertyNames(val);
    const props2 = Object.getOwnPropertyNames(other);
    if (props1.length !== props2.length) {
      return false;
    }
    const len = props1.length;
    for (let i = 0; i < len; i++) {
      const propName = props1[i];
      if (val[propName] !== other[propName]) {
        return false;
      }
    }
    return true;
  }
  return val === other;
};

export const resolvePromise = <T>(value: T): Promise<ResolvePromise<T>> => {
  return new Promise<ResolvePromise<T>>((resolve, reject) => {
    if (value instanceof Promise) {
      value
        .then(res => {
          resolve(resolvePromise(res));
        })
        .catch(err => reject(err));
    } else {
      resolve(value as ResolvePromise<T>);
    }
  });
};

export const getDomElement = <T extends DomElement>(target: DomParam<T>): T | null => {
  if (!isBrowser) {
    return null;
  }
  if (isRef(target)) {
    return target.current;
  }
  return target;
};

export const parseTimeRanges = (ranges: TimeRanges) => {
  const result: Record<'start' | 'end', number>[] = new Array(ranges.length);
  for (let i = 0; i < ranges.length; i++) {
    result[i] = { start: ranges.start(i), end: ranges.end(i) };
  }
  return result;
};

export const serializer = <T>(value: T) => {
  try {
    return JSON.stringify(value);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const deserializer = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const getValue = (key: string) => {
  try {
    const raw = sessionStorage?.getItem(key);
    if (raw) {
      return deserializer(raw);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

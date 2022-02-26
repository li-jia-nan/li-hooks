import React, { MutableRefObject } from 'react';
type Key = PropertyKey;
type Keys<Modules> = keyof Modules;
type Values<Modules> = Modules[Keys<Modules>];
type ResolvePromise<T> = T extends Promise<infer U> ? U : T;

type DomElement = HTMLElement | Element | Window | Document;

type DomParam<T extends DomElement = DomElement> = React.RefObject<T> | T;
declare global {
  type GlobalObject<V = any> = Record<PropertyKey, V>;
  type GlobalFunction<P extends any[] = any[], R = any> = (...args: P) => R;
}

type FunctionItems<T> = T extends GlobalFunction ? T : never;
type ArrayItem<T> = T extends Array<infer U> ? U : never;

// 如果是函数直接原数值返回
type ObjectKeysPartial<T> = T extends (...args: any[]) => any ? T : Partial<T>;

// 如果是函数原数值返回，不是函数。把每个键的值变为可选，但是函数还是原数组返回
type ObjectValuesPartial<T> = T extends (...args: any[]) => any
  ? T
  : {
      [K in keyof T]: ObjectKeysPartial<T[K]>;
    };

type FunctionReturnPartial<T> = T extends (...args: infer P) => infer R
  ? (...args: P) => ObjectKeysPartial<R>
  : T;

type FunctionParamsPartial<T> = T extends (...args: infer P) => infer R
  ? (...args: ObjectKeysPartial<P>) => R
  : T;

type FunctionParamsAndReturnPartial<T> = T extends (...args: infer P) => infer R
  ? (...args: ObjectKeysPartial<P>) => ObjectKeysPartial<R>
  : T;

type FunctionParamsValuePartial<T> = T extends (...args: infer P) => infer R
  ? (...args: ObjectValuesPartial<P>) => R
  : T;

type FunctionParamsValueAndReturnPartial<T> = T extends (...args: infer P) => infer R
  ? (...args: ObjectValuesPartial<P>) => ObjectKeysPartial<R>
  : T;

type AsyncFunction<P extends any[] = any[], R = any> = (...args: P) => Promise<R>;

type PromiseValue<T> = T extends (...args: any[]) => Promise<infer V> ? V : never;

export type TargetValue<T> = T | undefined | null;

export type BasicTarget<T extends DomElement = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export type {
  Key,
  Keys,
  Values,
  DomElement,
  DomParam,
  FunctionItems,
  ArrayItem,
  ObjectKeysPartial,
  ObjectValuesPartial,
  FunctionReturnPartial,
  FunctionParamsPartial,
  FunctionParamsValuePartial,
  FunctionParamsAndReturnPartial,
  FunctionParamsValueAndReturnPartial,
  AsyncFunction,
  PromiseValue,
  ResolvePromise,
};

import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { DomParam } from '../../types';
import { getDomElement, isSameDeps } from '../../utils';
import useUnmount from './useUnmount';

const createEffectWithTarget = (useEffectType: typeof useEffect | typeof useLayoutEffect) => {
  const useEffectWithTarget = (
    effect: EffectCallback,
    deps: DependencyList,
    target: DomParam<any> | DomParam<any>[]
  ) => {
    const hasInitRef = useRef(false);
    const lastElementRef = useRef<(Element | null)[]>([]);
    const lastDepsRef = useRef<DependencyList>([]);
    const unLoadRef = useRef<any>();

    useEffectType(() => {
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map(item => getDomElement(item));

      // init run
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
        return;
      }

      if (
        els.length !== lastElementRef.current.length ||
        !isSameDeps(els, lastElementRef.current) ||
        !isSameDeps(deps, lastDepsRef.current)
      ) {
        unLoadRef.current?.();
        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
      }
    });

    useUnmount(() => {
      unLoadRef.current?.();
      // for react-refresh
      hasInitRef.current = false;
    });
  };

  return useEffectWithTarget;
};

const useEffectWithTarget = createEffectWithTarget(useEffect);

interface Rect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  height: number;
  width: number;
}
export interface State extends Rect {
  text: string;
}

const initRect: Rect = {
  top: NaN,
  left: NaN,
  bottom: NaN,
  right: NaN,
  height: NaN,
  width: NaN,
};

const initState: State = {
  text: '',
  ...initRect,
};

function getRectFromSelection(selection: Selection | null): Rect {
  if (!selection) {
    return initRect;
  }

  if (selection.rangeCount < 1) {
    return initRect;
  }
  const range = selection.getRangeAt(0);
  const { height, width, top, left, right, bottom } = range.getBoundingClientRect();
  return { height, width, top, left, right, bottom };
}

const useTextSelection = (target?: DomParam<Document | Element>): State => {
  const [state, setState] = useState(initState);

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffectWithTarget(
    () => {
      const el = getDomElement(target!);
      if (!el) {
        return;
      }

      const mouseupHandler = () => {
        let selObj: Selection | null = null;
        let text = '';
        let rect = initRect;
        if (!window.getSelection) {
          return;
        }
        selObj = window.getSelection();
        text = selObj ? selObj.toString() : '';
        if (text) {
          rect = getRectFromSelection(selObj);
          setState({ ...state, text, ...rect });
        }
      };

      // 任意点击都需要清空之前的 range
      const mousedownHandler = () => {
        if (!window.getSelection) return;
        if (stateRef.current.text) {
          setState({ ...initState });
        }
        const selObj = window.getSelection();
        if (!selObj) return;
        selObj.removeAllRanges();
      };

      el.addEventListener('mouseup', mouseupHandler);

      document.addEventListener('mousedown', mousedownHandler);

      return () => {
        el.removeEventListener('mouseup', mouseupHandler);
        document.removeEventListener('mousedown', mousedownHandler);
      };
    },
    [],
    target
  );

  return state;
};

export default useTextSelection;

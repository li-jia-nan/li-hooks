import React, { useEffect, useState } from 'react';

export interface CursorState {
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

const initState: CursorState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
};

const useMouse = (): CursorState => {
  const [state, setState] = useState<CursorState>(initState);
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      const { screenX, screenY, clientX, clientY, pageX, pageY } = event || {};
      setState({ screenX, screenY, clientX, clientY, pageX, pageY });
    };
    document.addEventListener('mousemove', listener);
    return () => {
      document.removeEventListener('mousemove', listener);
    };
  }, []);
  return state;
};

export default useMouse;

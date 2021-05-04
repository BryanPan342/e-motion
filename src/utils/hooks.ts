import p5 from 'p5';
import {useCallback, useRef} from 'react';
import { UseP5 } from '.';

// Code snippet from https://github.com/zenoplex/react-use-p5/
export const useP5 = (sketch: (p: p5) => void): UseP5 => {
  const p5Ref = useRef<p5 | null>(null);
  const canvasParentRef = useRef<HTMLElement | null>(null);

  const setCanvasParentRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        p5Ref.current = new p5(sketch, node);
      }
      else {
        // when component unmounts node is null
        if (p5Ref.current) p5Ref.current.remove();
      }
      canvasParentRef.current = node;
    }, [sketch]);

  return [setCanvasParentRef, p5Ref.current, canvasParentRef.current];
};
import React from 'react';
import { P5_Sketch, useP5 } from '../../utils';


export default function P5Scene (props: {sketch: P5_Sketch}): JSX.Element {
  const [setRef] = useP5(props.sketch);

  return (
    <div ref={setRef}></div>
  );
}
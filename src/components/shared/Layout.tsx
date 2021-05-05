import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';
import { animateLeft, animateOutRight, animateOutUp, animateUp, ButtonRef, fade, hideButton, showButton} from '../../utils';

import '../styles/Layout.scss';
import P5Scene from './P5Scene';

export interface SceneProps {
  sketch: (p: p5) => void;
  duration: number;
  text: string;
  image: string;
  imageAlt?: string;
}

export interface LayoutProps {
  children: SceneProps[];
  exit: () => void;
}

const num_circles = 2;
const size = 25;
const center = size / 2;

function Layout(props: LayoutProps): JSX.Element {
  const {children: scenes, exit} = props;

  const nextRef = useRef<HTMLButtonElement | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [sceneIdx, setSceneIdx] = useState(0);
  const [scene, setScene] = useState<SceneProps | null>(null);

  useEffect(() => {
    hideButton(nextRef);

    if (sceneIdx >= scenes.length) exit();

    animateOutRight('.foreground-image');
    animateOutUp('.text-wrapper p');

    setTimeout(() => {
      setScene(scenes[sceneIdx]);
    }, 1000);

  }, [sceneIdx]);

  useEffect(() => {
    animateLeft('.foreground-image');
    animateUp('.text-wrapper p');

    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      showButton(nextRef);
      timeout.current = null;
    }, scene?.duration ?? 2000);
  }, [scene]);

  const next = () => {
    setSceneIdx(sceneIdx + 1);
  };

  return (
    <div id={'layout'}>
      {scene &&
        <>
          <P5Scene sketch={scene.sketch}/>
          <img src={scene.image} alt={scene.imageAlt} className={'foreground-image'}/>
          <div className={'text-wrapper'}>
            <p>{scene.text}</p>
          </div>
        </>
      }
      <button onClick={() => next()} ref={nextRef} id={'next'}>
        <svg id={'svg-cta'} width={size} height={size}>
          {Array(num_circles).fill(0).map((_, i) => 
            <circle
              className={'svg-circle-bg'}
              cx={center}
              cy={center}
              r={center}
              key={i}/>
          )}
          <circle
            className={'svg-circle-inner'}
            cx={center}
            cy={center}
            r={center}/>
        </svg>
      </button>
    </div>
  );
}

export default Layout;
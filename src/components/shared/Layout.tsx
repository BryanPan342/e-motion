import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';
import { animateLeft, animateOutRight, animateOutUp, animateUp, hideButton, showButton} from '../../utils';

import '../styles/Layout.scss';
import P5Scene from './P5Scene';

interface Exposition {
  text: string;
  duration: number;
}

export interface SceneProps {
  sketch: (p: p5) => void;
  expo: Exposition[];
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
  const [scene, setScene] = useState<SceneProps>(scenes[0]);
  const [expoIdx, setExpoIdx] = useState(0);

  useEffect(() => {
    hideButton(nextRef);

    if (sceneIdx >= scenes.length) exit();

    animateOutRight('.foreground-image');

    setTimeout(() => {
      setScene(scenes[sceneIdx]);
      setExpoIdx(0);
    }, 1000);
  }, [sceneIdx]);

  useEffect(() => {
    setTimeout( () => {
      animateLeft('.foreground-image');
    }, 5000);
  }, [scene]);

  useEffect(() => {
    if (expoIdx >= scene.expo.length) return;
    setTimeout( () => {
      animateUp(`.text-wrapper #expo-${expoIdx}`);
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        if (expoIdx === scene.expo.length - 1) showButton(nextRef);
        animateOutUp(`.text-wrapper #expo-${expoIdx}`);
        setExpoIdx(expoIdx + 1);
        timeout.current = null;
      }, (scene.expo[expoIdx].duration ?? 2000));
    }, 4000);
  }, [expoIdx]);

  const next = () => {
    setSceneIdx(sceneIdx + 1);
  };

  return (
    <div id={'layout'}>
      <P5Scene sketch={scene.sketch}/>
      <img src={scene.image} alt={scene.imageAlt} className={'foreground-image'}/>
      <div className={'text-wrapper'}>
        {scene.expo.map(({text}, i) =>
          <div key={`${sceneIdx}-${i}`}id={`expo-${i}`}>{text}</div>,
        )}
      </div>
      <button onClick={() => next()} ref={nextRef} id={'next'}>
        <svg id={'svg-cta'} width={size} height={size}>
          {Array(num_circles).fill(0).map((_, i) =>
            <circle
              className={'svg-circle-bg'}
              cx={center}
              cy={center}
              r={center}
              key={i}/>,
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
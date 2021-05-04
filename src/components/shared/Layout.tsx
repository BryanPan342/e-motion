import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonRef} from '../../utils';

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

function Layout(props: LayoutProps): JSX.Element {
  const {children: scenes, exit} = props;

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [sceneIdx, setSceneIdx] = useState(0);
  const [scene, setScene] = useState<SceneProps | null>(null);

  useEffect(() => {
    // animation to fade out current scene
    overlayRef.current && (overlayRef.current.style.visibility = 'hidden');
    hideButton(prevRef);
    hideButton(nextRef);

    if (sceneIdx >= scenes.length) exit();
    setScene(scenes[sceneIdx]);

  }, [sceneIdx]);

  useEffect(() => {
    // animation to fade in scene
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      overlayRef.current && (overlayRef.current.style.visibility = 'visible');
      if (sceneIdx > 0) { showButton(prevRef); }
      showButton(nextRef);
      timeout.current = null;
    }, scene?.duration ?? 2000);
  }, [scene]);

  const showButton = (ref: ButtonRef) => {
    ref.current && (ref.current.style.visibility = 'visible');
  };

  const hideButton = (ref: ButtonRef) => {
    ref.current && (ref.current.style.visibility = 'hidden');
  };

  const prev = () => {
    if (sceneIdx < 1) return;
    setSceneIdx(sceneIdx - 1);
  };

  const next = () => {
    if (sceneIdx >= scenes.length) return;
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
      <div ref={overlayRef} id={'overlay'} >
        <button onClick={() => prev()} ref={prevRef} id={'prev'}/>
        <button onClick={() => next()} ref={nextRef} id={'next'}/>
      </div>
    </div>
  );
}

export default Layout;
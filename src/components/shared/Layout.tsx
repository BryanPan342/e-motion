import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';
import backArrow from '../../assets/back-arrow.png';
import coffeeCupImg from '../../assets/coffeecup.png';
import cupImg from '../../assets/cup.png';
import {
  animateLeft,
  animateOutRight,
  animateOutUp,
  animateUp,
  hideButton,
  showButton,
} from '../../utils';

import '../styles/ChapterList.scss';
import '../styles/Layout.scss';
import P5Scene from './P5Scene';

interface Exposition {
  text: string;
  duration: number;
}

export interface SceneProps {
  sketch: (p: p5) => void;
  audio: string;
  expo: Exposition[];
  image: string;
  imageAlt?: string;
  style?: React.CSSProperties;
}

export interface LayoutProps {
  children: SceneProps[];
  exit: () => void;
}

const num_circles = 2;
const size = 25;
const center = size / 2;

function Layout(props: LayoutProps): JSX.Element {
  const { children: scenes, exit } = props;

  const menuBtn = useRef<HTMLButtonElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextRef = useRef<HTMLButtonElement | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [sceneIdx, setSceneIdx] = useState(0);
  const [scene, setScene] = useState<SceneProps>(scenes[0]);
  const [expoIdx, setExpoIdx] = useState(0);
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    hideButton(nextRef);

    if (sceneIdx >= scenes.length) exit();
    if (sceneIdx > 0) animateOutRight('.foreground-image');
    if (audioRef && sceneIdx > 0) audioRef.current.pause();

    setTimeout(() => {
      setScene(scenes[sceneIdx]);
      setExpoIdx(0);
    }, 1000);
  }, [sceneIdx]);

  useEffect(() => {
    audioRef.current = new Audio(scene.audio);
    audioRef.current.volume = 0.15;
    void audioRef.current.play();
    setTimeout(() => {
      animateLeft('.foreground-image');
    }, 5000);
  }, [scene]);

  useEffect(() => {
    if (expoIdx >= scene.expo.length) return;

    // wait 6 seconds for first expoIdx to load in
    if (expoIdx == 0) {
      setTimeout(() => {
        animateUp(`.text-wrapper #expo-${expoIdx}`);
        timeout.current && clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          if (expoIdx === scene.expo.length - 1) showButton(nextRef);
          animateOutUp(`.text-wrapper #expo-${expoIdx}`);
          setExpoIdx(expoIdx + 1);
          timeout.current = null;
        }, scene.expo[expoIdx].duration ?? 2000);
      }, 6000);
    } else {
      animateUp(`.text-wrapper #expo-${expoIdx}`);
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        if (expoIdx === scene.expo.length - 1) showButton(nextRef);
        animateOutUp(`.text-wrapper #expo-${expoIdx}`);
        setExpoIdx(expoIdx + 1);
        timeout.current = null;
      }, scene.expo[expoIdx].duration ?? 2000);
    }
  }, [expoIdx]);

  const next = () => {
    setSceneIdx(sceneIdx + 1);
  };

  const ChapterList = () => {
    return (
      <div className="modal">
        <img src={backArrow} id="returnBack" onClick={() => setIsMenu(false)} />
        <div id="topbar">
          <p>main menu</p>
        </div>

        <div className="modal-content">
          <img src={coffeeCupImg} />

          <p id="title">chapter list</p>
          <div>
            <span id="dot1"></span>
            <p
              onClick={() => {
                setSceneIdx(0);
                setIsMenu(false);
              }}
            >
							ch. 1 intro
            </p>
          </div>
          <div>
            <span id="dot2"></span>
            <p
              onClick={() => {
                setSceneIdx(1);
                setIsMenu(false);
              }}
            >
							ch. 2 first hearing aids
            </p>
          </div>
          <div>
            <span id="dot3"></span>
            <p
              onClick={() => {
                setSceneIdx(2);
                setIsMenu(false);
              }}
            >
							ch. 3 sadness
            </p>
          </div>
          <div>
            <span id="dot4"></span>
            <p
              onClick={() => {
                setSceneIdx(3);
                setIsMenu(false);
              }}
            >
							ch. 4 support from family
            </p>
          </div>
          <div>
            <span id="dot5"></span>
            <p
              onClick={() => {
                setSceneIdx(4);
                setIsMenu(false);
              }}
            >
							ch. 5 end
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id={'layout'}>
      <button onClick={() => setIsMenu(true)} ref={menuBtn} id={'menuBtn'}>
        <img src={cupImg} />
      </button>
      {isMenu && <ChapterList />}
      <P5Scene sketch={scene.sketch} />
      <img
        draggable={false}
        src={scene.image}
        alt={scene.imageAlt}
        className={'foreground-image'}
        style={scene.style}
      />
      <div className={'text-wrapper'}>
        {scene.expo.map(({ text }, i) => (
          <div key={`${sceneIdx}-${i}`} id={`expo-${i}`}>
            {text}
          </div>
        ))}
      </div>
      <button onClick={() => next()} ref={nextRef} id={'next'}>
        <svg id={'svg-cta'} width={size} height={size}>
          {Array(num_circles)
            .fill(0)
            .map((_, i) => (
              <circle
                className={'svg-circle-bg'}
                cx={center}
                cy={center}
                r={center}
                key={i}
              />
            ))}
          <circle
            className={'svg-circle-inner'}
            cx={center}
            cy={center}
            r={center}
          />
        </svg>
      </button>
    </div>
  );
}

export default Layout;

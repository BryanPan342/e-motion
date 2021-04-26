
import React, { useEffect, useRef } from 'react';

import Coffee from '../../assets/coffee.jpg';
import Scene from '../shared/three/Scene';

import '../styles/ThreeJSBackground.scss';

function ThreeJSBackground(): JSX.Element {
  const scene = useRef<Scene | null>(null);

  useEffect(() => {
    scene.current = new Scene();
  }, []);

  return (
    <>
      <section className={'container'}>
        <article className={'tile'}>
          <figure className={'tile-figure'}>
            <img src={Coffee} data-hover={Coffee} className={'tile-image'} width={'400'} height={'600'}/>
          </figure>
        </article>
      </section>
      <canvas id={'stage'}/>
    </>
  );
}

export default ThreeJSBackground;
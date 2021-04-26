import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TweenMax as TM } from 'gsap';

import Coffee from '../../assets/coffee.jpg';

import '../styles/ThreeJSBackground.scss';

class Figure {
  private _image: any;
  private scene: THREE.Scene;
  private loader: THREE.TextureLoader;
  private image: THREE.Texture;
  private hoverImage: THREE.Texture;

  private size: THREE.Vector2;
  private offset: THREE.Vector2;
  private material?: THREE.MeshBasicMaterial;
  private geometry?: THREE.PlaneGeometry;
  public mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  public mouse: THREE.Vector2;

  constructor(scene: THREE.Scene) {
    this._image = document.querySelector('.tile-image');
    this.scene = scene;

    this.loader = new THREE.TextureLoader();

    this.image = this.loader.load(this._image.src);
    this.hoverImage = this.loader.load(this._image.dataset.hover);


    this.size = new THREE.Vector2(0, 0);
    this.offset = new THREE.Vector2(0, 0);

    this.getSizes();

    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ map: this.image });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.size.x, this.size.y, 1);

    this.scene.add(this.mesh);

    this.mouse = new THREE.Vector2(0, 0);
    window.addEventListener('mousemove', ev => {
      this.mouseMove(ev);
    });
  }

  public getSizes() {
    const {width, height, top, left} = this._image.getBoundingClientRect();
    this.size.set(width, height);
    this.offset.set(left - window.innerWidth / 2 + width / 2, -top + window.innerHeight / 2 - height / 2);
  }

  public mouseMove(ev) {
    TM.to(this.mouse, 0.5, {
      x: (ev.clientX / window.innerWidth) * 2 - 1,
      y: -(ev.clientY / window.innerHeight) * 2 + 1,
    });

    // this.mesh.rotation.set(-this.mouse.y * .3, this.mouse.x * (Math.PI / 6), 0);
  
    TM.to(this.mesh.rotation, 0.5, {
      x: -this.mouse.y * .3,
      y: this.mouse.x * (Math.PI / 6),
    });
  }
}

class Scene {
  perspective: number;
  container: HTMLCanvasElement;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  figure: Figure;
  camera: THREE.PerspectiveCamera;
  constructor() {
      this.perspective = 800;
      this.container = document.getElementById('stage') as HTMLCanvasElement;

      this.scene = new THREE.Scene()
      this.renderer = new THREE.WebGLRenderer({
          canvas: this.container,
          alpha: true
      })

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)

      this.initLights()
      this.initCamera()

      this.figure = new Figure(this.scene)

      this.update()
  }

  initLights() {
      const ambientlight = new THREE.AmbientLight(0xffffff, 2)
      this.scene.add(ambientlight)
  }

  initCamera() {
      const fov =
          (180 * (2 * Math.atan(window.innerHeight / 2 / this.perspective))) /
          Math.PI

      this.camera = new THREE.PerspectiveCamera(
          fov,
          window.innerWidth / window.innerHeight,
          1,
          1000
      )
      this.camera.position.set(0, 0, this.perspective)
  }

  update() {
      if (this.renderer === undefined || this.scene === undefined || this.camera === undefined) return
      requestAnimationFrame(this.update.bind(this))

      this.renderer.render(this.scene, this.camera)
  }
}

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
            <img src={Coffee} data-hover={Coffee} className={'tile-image'} width={'400'}/>
          </figure>
        </article>
      </section>
      <canvas id={'stage'}/>
    </>
  );
}

export default ThreeJSBackground;
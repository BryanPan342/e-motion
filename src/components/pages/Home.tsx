import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.scss';

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

class Scene {
  perspective: number;
  container: HTMLCanvasElement;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;

  constructor() {
    this.perspective = 800;
    this.container = document.getElementById('stage') as HTMLCanvasElement;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.initLights();
    this.initCamera();

    this.controls = new OrbitControls(this.camera, this.container);

    const loader = new GLTFLoader();
    loader.load('/assets-3d/mug.glb', (gltf) => {
      gltf.scene.position.set(0, -100, 0);
      this.scene.add(gltf.scene);
    }, undefined, (error) => console.error(error));

    this.update();

  }

  private initLights(): void {
    const directionalLight = new THREE.DirectionalLight(0xfafafa,1);
    directionalLight.position.set(0,100,0);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    const light = new THREE.PointLight(0xc4c4c4,1);
    light.position.set(0,300,500);
    this.scene.add(light);
    
    const light2 = new THREE.PointLight(0xc4c4c4,1);
    light2.position.set(500,100,0);
    this.scene.add(light2);
    
    const light3 = new THREE.PointLight(0xc4c4c4,1);
    light3.position.set(0,100,-500);
    this.scene.add(light3);

    const light4 = new THREE.PointLight(0xc4c4c4,1);
    light4.position.set(-500,300,500);
    this.scene.add(light4);
  }

  private initCamera(): void {
    const fov = 50;

    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    this.camera.position.set(0, 400, this.perspective);
  }

  public update(): void {
    if (this.renderer === undefined) return;
    requestAnimationFrame(this.update.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

function Home(): JSX.Element {
  const scene = useRef<Scene | null>(null);

  useEffect(() => {
    scene.current = new Scene();
  }, []);

  return (
    <div id={'home-container'}>
      <canvas id={'stage'}/>
      <Link to='/story1'>
        <div id={'start-button'}>
          START
        </div>
      </Link>
    </div>
  );
}

export default Home;
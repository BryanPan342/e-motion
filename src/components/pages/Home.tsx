import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.scss';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { ASPECT_RATIO } from '../../utils';

class MugScene {
  public readonly perspective: number;
  public readonly container: HTMLCanvasElement;
  public readonly scene: THREE.Scene;
  public readonly renderer: THREE.WebGLRenderer;
  public readonly camera!: THREE.PerspectiveCamera;
  public readonly controls!: OrbitControls;

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
    this.camera = new THREE.PerspectiveCamera(50, ASPECT_RATIO(), 1, 2000);
    this.camera.position.set(0, 400, this.perspective);

    this.controls = new OrbitControls(this.camera, this.container);

    const loader = new GLTFLoader();
    loader.load('/assets-3d/mug.glb', (gltf) => {
      gltf.scene.position.set(0, -100, 0);
      gltf.scene.children.forEach((mesh) => {
        if (!mesh.material.name.includes('Buffer Layer material 1')) return;
        mesh.material = new THREE.MeshPhongMaterial({
          color: mesh.material.color,
          shininess: 15,
          reflectivity: .8,
          refractionRatio: .5,
          specular: 0x010101,
        });
      });
      this.scene.add(gltf.scene);
    });

    window.addEventListener('resize', this.resize, false);
    this.update();
  }

  private resize() {
    this.camera.aspect = ASPECT_RATIO();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
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

  public update(): void {
    if (this.renderer === undefined) return;
    requestAnimationFrame(this.update.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

function Home(): JSX.Element {
  const scene = useRef<MugScene | null>(null);

  useEffect(() => {
    scene.current = new MugScene();
  }, []);

  return (
    <div id={'home-container'}>
      <canvas id={'stage'} />
      <Link to="/story1">
        <div id={'start-button'}>START</div>
      </Link>
      <p id='creds'>Story by Humans of New York, Music by Dennis Kuo</p>
    </div>
  );
}

export default Home;
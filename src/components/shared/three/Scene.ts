import * as THREE from 'three';
import Figure from './Figure';

export default class Scene {
  perspective: number;
  container: HTMLCanvasElement;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  figure: Figure;
  camera: THREE.PerspectiveCamera;

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

    this.figure = new Figure(this.scene, () => {
      this.update();
    });
  }

  private initLights(): void {
    const ambientlight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(ambientlight);
  }

  private initCamera(): void {
    const fov =
          (180 * (2 * Math.atan(window.innerHeight / 2 / this.perspective))) /
          Math.PI;

    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    this.camera.position.set(0, 0, this.perspective);
  }

  public update(): void {
    if (this.renderer === undefined) return;
    requestAnimationFrame(this.update.bind(this));

    this.figure.update();

    this.renderer.render(this.scene, this.camera);
  }
}
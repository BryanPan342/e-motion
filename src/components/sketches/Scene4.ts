import p5 from 'p5';
import {
  BUBBLE_FREQUENCY,
  BUBBLE_FREQUENCY_ON_LINES,
  TRANSPARENCY,
  TRANSPARENCY_RADIUS,
  INC,
  INC_START,
  MAG_INC,
  SCL,
  NUM_PARTICLES,
  STROKE_WEIGHT,
  CURSOR_RADIUS,
} from '../../utils/constants';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;

  let start = 0;
  let cols: number;
  let rows: number;
  let zoff = 0;
  let particles: Particle[] = [];
  let flowfield: p5.Vector[];
  let magOff = 0;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');
    p.pixelDensity(1);
    cols = p.floor(window.innerWidth / SCL);
    rows = p.floor(window.innerHeight / SCL);
    p.background(0);

    particles = Array(NUM_PARTICLES).fill(0).map(() => {
      return new Particle();
    });

    flowfield = new Array(rows * cols);
  };

  p.draw = () => {
    p.background(0);

    let yoff = start;
    for (let y = 0; y < rows; y++ && (yoff += INC)) {
      let xoff = start;
      for (let x = 0; x < cols; x++ && (xoff += INC)) {
        const index = findIndex(x,y);
        const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
        const v = p5.Vector.fromAngle(angle); // vector from angle
        const m = p.map(p.noise(xoff, yoff, magOff), 0, 1, -5, 5);
        v.setMag(m);
        flowfield[index] = v;
      }
    }
    magOff += MAG_INC;
    zoff += INC_START;
    start -= MAG_INC;

    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].updatePrev();
      particles[i].show();
    }

    if (p.random(10) > 5 && particles.length < 2500) {
      const rnd = p.floor(p.noise(zoff) * 20);
      for (let i = 0; i < rnd; i++) {
        particles.push(new Particle());
      }
    } else if (particles.length > 2000) {
      const rnd = p.floor(p.random(10));
      for (let i = 0; i < rnd; i++) {
        particles.shift();
      }
    }
    p.circle(p.mouseX, p.mouseY, CURSOR_RADIUS());
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, true);
  };

  const findIndex = (x: number, y: number) => {
    return x + y * cols;
  };

  class Particle {
    public pos: p5.Vector;
    public vel: p5.Vector;
    private _acc: p5.Vector;
    private _maxSpeed: number;
    private _prevPos: p5.Vector;
    private _bubble: number;

    constructor() {
      this.pos = p.createVector(p.random(window.innerWidth),p.random(window.innerHeight));
      this.vel = p.createVector(0, 0);
      this._acc = p.createVector(0, 0);
      this._maxSpeed = 2;
      this._bubble = p.random();

      this._prevPos = this.pos.copy();
    }

    public update() {
      this.vel.add(this._acc);
      this.vel.limit(this._maxSpeed);
      this.pos.add(this.vel);
      this._acc.mult(0);
    }

    public show() {
      p.strokeWeight(STROKE_WEIGHT);
      p.line(this.pos.x, this.pos.y, this._prevPos.x, this._prevPos.y);
      this.updatePrev();
    }

    public updatePrev() {
      this._prevPos.x = this.pos.x;
      this._prevPos.y = this.pos.y;
    }

    public follow(vectors: p5.Vector[]) {
      const x = p.floor(this.pos.x / SCL);
      const y = p.floor(this.pos.y / SCL);
      const index = findIndex(x,y);
      this._acc.add(vectors[index]);

      /** drawing depending on bubble */
      const di = p.dist(p.mouseX, p.mouseY, this.pos.x, this.pos.y);
      p.stroke(di <= TRANSPARENCY_RADIUS? p.color(77, 184, 165) : p.color(41, 157,116, TRANSPARENCY*255));
      if (
        di <= TRANSPARENCY_RADIUS &&
							this._bubble < BUBBLE_FREQUENCY &&
							p.random() < BUBBLE_FREQUENCY_ON_LINES
      ) {
        p.fill(77, 184, 165);
        p.ellipse(this.pos.x, this.pos.y, p.width * 0.006);
      }
    }
  }
}
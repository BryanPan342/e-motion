import p5 from 'p5';
// import {
//   LINE_THICKNESS,
//   POINT_RADIUS,
//   POINT_FREQUENCY,
// } from '../../utils/constants';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  const xo = 1;
  const yo = 1;
  const easing = 0.1;
  // const points: p5.Vector[] = [];

  const inc = 0.1;
  const incStart = 0.005;
  const magInc = 0.0005;
  let start = 0;
  const scl = 10;
  let cols:number;
  let rows:number;
  let zoff = 0;
  const particles: Particle[] = [];
  const numParticles = 500;
  let flowfield: p5.Vector [];
  let flowcolorfield: number [][];
  let magOff = 0;
  const showField = false;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');
    p.pixelDensity(1);
    cols = p.floor(window.innerWidth / scl);
    rows = p.floor(window.innerHeight / scl);
    p.background(0);

    for (let i = 0; i < numParticles; i++) {
      particles[i] = new Particle();
    }

    flowfield = new Array(rows * cols);
    flowcolorfield = new Array(rows * cols);
    for (let i = 0; i < flowcolorfield.length; i++) {
			flowcolorfield[i] = new Array(3);
		}
  };

  p.draw = () => {
    if (showField) {
      p.background(0);
    } else {
      p.background(p.color(0, 0, 0, 5));
    }
    let yoff = start;
    for (let y = 0; y < rows; y++) {
      let xoff = start;
      for (let x = 0; x < cols; x++) {
        const index = x + y * cols;
        const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
        const v = p5.Vector.fromAngle(angle); // vector from angle
        const m = p.map(p.noise(xoff, yoff, magOff), 0, 1, -5, 5);
        v.setMag(m);
        if (showField) {
          p.push();
          p.stroke(255);
          p.translate(x * scl, y * scl);
          p.rotate(v.heading());
          const endpoint = p.abs(m) * scl;
          p.line(0, 0, endpoint, 0);
          if (m < 0) {
            p.stroke("red");
          } else {
            p.stroke("green");
          }
          p.line(endpoint - 2, 0, endpoint, 0);
          p.pop();
        }
        flowfield[index] = v;
        xoff += inc;
      }
      yoff += inc;
    }
    magOff += magInc;
    zoff += incStart;
    start -= magInc;

    if (!showField) {

      for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield, flowcolorfield);
        particles[i].update();
        particles[i].edges();
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
    }

    // p.background('black');

    // const dx = p.mouseX - xo;
    // xo += dx * easing;

    // const dy = p.mouseY - yo;
    // yo += dy * easing;

    // p.ellipse(xo, yo, 66, 66);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, false);
  };

  class Particle {
    public pos: p5.Vector;
    public vel: p5.Vector;
    public acc: p5.Vector;
    private _maxSpeed:number;
    public prevPos: p5.Vector;

    constructor() {
      this.pos = p.createVector(p.random(window.innerWidth), p.random(window.innerHeight));
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this._maxSpeed = 2;

      this.prevPos = this.pos.copy();
    }


    public update () {

      this.vel.add(this.acc);
      this.vel.limit(this._maxSpeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    public show () {


      p.strokeWeight(1);
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
      //point(this.pos.x, this.pos.y);
    }

    public updatePrev () {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }

    public edges () {
      this.updatePrev();
    }

    public follow (vectors:p5.Vector [], colorfield:number [][]) {

      const x = p.floor(this.pos.x / scl);
      const y = p.floor(this.pos.y / scl);
      const index = x + y * cols;
      const force = vectors[index];
      this.acc.add(force);
      const c = colorfield[index];
      if (c) {
        p.stroke(p.color(50, 250,50));
      }
    }
  }
}

// points[i].add(p.createVector(p.cos(angle), p.sin(angle)));
// p.ellipse(points[i].x, points[i].y, LINE_THICKNESS);

// if (p.random() < POINT_FREQUENCY) {
// 	p.ellipse(points[i].x, points[i].y, POINT_RADIUS);
// }

//     p.point(p.mouseX, p.mouseY, 66);
// 		// p.square(xo, yo, 66);
// 		// p.fill('yellow');
// 		// p.ellipse(p.mouseX, p.mouseY, 44);
// 		// p.fill('red');

// 		p.ellipse(p.mouseX, p.mouseY, POINT_RADIUS);

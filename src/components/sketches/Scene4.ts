import p5 from "p5";
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
  STROKE_WEIGHT

} from "../../utils/constants";

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;

  let start = 0;
  let cols: number;
  let rows: number;
  let zoff = 0;
  const particles: Particle[] = [];
  let flowfield: p5.Vector[];
  let magOff = 0;
  const showField = false;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id("p5-background");
    p.pixelDensity(1);
    cols = p.floor(window.innerWidth / SCL);
    rows = p.floor(window.innerHeight / SCL);
    p.background(0);

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles[i] = new Particle();
    }

    flowfield = new Array(rows * cols);

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
          p.translate(x * SCL, y * SCL);
          p.rotate(v.heading());
          const endpoint = p.abs(m) * SCL;
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
        xoff += INC;
      }
      yoff += INC;
    }
    magOff += MAG_INC;
    zoff += INC_START;
    start -= MAG_INC;

    if (!showField) {
      for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
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
    private _acc: p5.Vector;
    private _maxSpeed: number;
    public _prevPos: p5.Vector;
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
      //point(this.pos.x, this.pos.y);
    }

    public updatePrev() {
      this._prevPos.x = this.pos.x;
      this._prevPos.y = this.pos.y;
    }

    public edges() {
      this.updatePrev();
    }

    public follow(vectors: p5.Vector[]) {
      const x = p.floor(this.pos.x / SCL);
      const y = p.floor(this.pos.y / SCL);
      const index = x + y * cols;
      this._acc.add(vectors[index]);

      /** drawing depending on bubble */
      const di = p.dist(p.mouseX, p.mouseY, this.pos.x, this.pos.y);
      if (di <= TRANSPARENCY_RADIUS) {
        p.stroke(p.color(77, 184, 165));
        if (this._bubble < BUBBLE_FREQUENCY) {
          if (p.random() < BUBBLE_FREQUENCY_ON_LINES) {
            p.fill(77, 184, 165);
            p.ellipse(this.pos.x, this.pos.y, p.width*.006);
          }
        }
      } else {
        p.stroke(`rgba(${41}, ${157}, ${116}, ${TRANSPARENCY})`);
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

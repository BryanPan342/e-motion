import p5 from 'p5';
import {
  MAX_RING_PARTICLES,
  RING_RADIUS,
  RING_COVERAGE,
  EXPLODE_RANGE,
  EXPLODE_OFFSET,
  FIREWORK_LIFESPAN,
  LIFESPAN_DECREMENT,
  VELOCITY_CHANGE,
  TRAIL_SIZE,
  CURSOR_RADIUS,
} from '../../utils/constants';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  const fireworks: Firework[] = [];
  const ringParticles: RingParticle[] = [];
  let gravity: p5.Vector;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');
    gravity = p.createVector(0, 0.095);
    p.background(0);

    /** Setting mode to degrees for spawning ringParticles in circle */
    p.angleMode(p.DEGREES);
    /** Sets 0,0 to centre */
    p.translate(p.width / 2, p.height / 2);
    /** Max number of ringParticles */
    p.frameRate(30);
    p.fill(251, 169, 100);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, true);
  };

  p.draw = () => {
    /** easy trails but rings trail */
    p.background(0, 0, 0, 25);
    p.fill(251, 169, 100);
    p.ellipse(p.mouseX, p.mouseY, CURSOR_RADIUS(), CURSOR_RADIUS());
    if (p.random(1) < 0.03) {
      fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();

      if (fireworks[i].done()) {
        fireworks.splice(i, 1);
      }
    }

    /** If too many ringParticles on screen */
    if (ringParticles.length > MAX_RING_PARTICLES) {
      /** Delete old ringParticles (from beginning of array) */
      ringParticles.splice(0, MAX_RING_PARTICLES / 2);
    }

    /** Loop through the array and show each particle */
    for (let i = 0; i < ringParticles.length; i++) {
      ringParticles[i].update();
      if (ringParticles[i].done()) {
        ringParticles.splice(i, 1);
      } else {
        ringParticles[i].show();
      }
    }
  };
  /** Spawn ringParticles in ring with centre mouse x and y coords */
  p.mouseClicked = () => {
    for (let i = 0; i < RING_COVERAGE; i += 4) {
      const c = new RingParticle(p.mouseX, p.mouseY, i);
      ringParticles.push(c);
    }
  };

  class Firework {
    public explodeSize: number;
    public exploded: boolean;
    private _firingParticle: Particle;
    private _particles: Array<Particle>;

    constructor() {
      this.explodeSize = p.random(0, EXPLODE_RANGE);
      this._firingParticle = new Particle(p.random(p.width), p.height, true);
      this.exploded = false;
      this._particles = [];
    }

    public update() {
      if (!this.exploded) {
        this._firingParticle.update(gravity);

        if (this._firingParticle.vel.y >= 0) {
          this.explode();
        }
      }

      this._particles = this._particles.filter((particle) => {
        particle.update(gravity);
        return !particle.done();
      });
    }

    public done() {
      return this.exploded && this._particles.length === 0;
    }

    public show() {
      if (!this.exploded) {
        this._firingParticle.show();
      }

      for (let i = 0; i < this._particles.length; i++) {
        this._particles[i].show();
      }
    }

    private explode() {
      this.exploded = true;
      for (let i = 0; i < this.explodeSize * EXPLODE_OFFSET; i++) {
        const particle = new Particle(
          this._firingParticle.pos.x,
          this._firingParticle.pos.y,
          false,
        );
        this._particles.push(particle);
      }
    }
  }

  class Particle {
    public pos: p5.Vector;
    public vel: p5.Vector;
    public isFirework: boolean;
    private _lifespan: number;
    private rand: number;

    constructor(x: number, y: number, isFirework: boolean) {
      this.pos = p.createVector(x, y);
      this.isFirework = isFirework;
      this._lifespan = FIREWORK_LIFESPAN;
      this.rand = p.random(0, 3);
      this.vel = this.isFirework
        ? p.createVector(0, p.random(-12, -8))
        : p5.Vector.random2D().mult(p.random(2, 10));
    }

    public update(force: p5.Vector) {
      if (!this.isFirework) {
        this.vel.mult(0.9);
        this._lifespan -= 4;
      }
      this.vel.add(force);
      this.pos.add(this.vel);
    }

    public done() {
      return this._lifespan < 0;
    }

    public show() {
      if (!this.isFirework) {
        /** after explosion */
        p.strokeWeight(8);
        p.stroke(255, 192, 97, this._lifespan);
      } else {
        p.strokeWeight(10);
      }

      const opacity = this.rand < 1 ? 0.2 : this.rand < 2 ? 0.4 : 0.6;
      p.stroke(`rgba(255,192,97,${opacity})`);
      p.point(this.pos.x, this.pos.y);
    }
  }

  class RingParticle {
    /** The position of the Ring Particle */
    public pos: p5.Vector;
    private _vel: p5.Vector;
    private _acc: p5.Vector;
    private _radius: number;
    private _time: number;
    private _explode: boolean;
    private _lifespan: number;
    private _history: p5.Vector[];

    constructor(x: number, y: number, theta: number) {
      this.pos = p.createVector(x, y);
      /** Velocity */
      this._vel = p.createVector(2, 2);
      this._radius = RING_RADIUS;
      this._vel.limit(5);
      /** Acceleration */
      this._acc = p.createVector(0.1, 0.1);
      /** Rotate velocity to the given rotation*/
      this._vel.rotate(theta);
      /** Rotate to the given rotation */
      this._acc.rotate(theta);
      /** Time alive */
      this._time = 0;
      this._explode = false;

      this._lifespan = FIREWORK_LIFESPAN;
      this._history = [];
    }
    public update() {
      this._vel.add(this._acc);
      /** Update position with velocity*/
      this.pos.add(this._vel);
      /** If older than 40, be deleted next draw event*/
      if (this._time <= 40) {
        /** If older than 15, reduce the size of the ringParticles every step*/
        if (this._time > 15) {
          this._radius -= 0.05;
        }
        this._time++;
      } else {
        if (this._lifespan == FIREWORK_LIFESPAN) {
          this._explode = true;
          this._acc.add(p.createVector(0, 0.3));

          this._vel = p5.Vector.random2D().mult(p.random(2, 10));
        }
        this._vel.mult(VELOCITY_CHANGE);
        this._lifespan -= LIFESPAN_DECREMENT;

        this._history.push(p.createVector(this.pos.x, this.pos.y));

        /** size of trail */
        if (this._history.length > TRAIL_SIZE) {
          this._history.shift();
        }
      }
    }
    public done() {
      return this._lifespan < 0;
    }

    public show() {
      if (!this._explode) {
        p.noStroke();
        p.fill(251, 169, 100, 204);

        /** Draw point */
        p.ellipse(this.pos.x, this.pos.y, this._radius);
      } else {
        p.strokeWeight(6);
        p.stroke(251, 169, 100, (this._lifespan * 3) / 5);

        this._history.map(pos => p.point(pos.x, pos.y));
      }
    }
  }
}

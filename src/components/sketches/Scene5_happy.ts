import p5 from 'p5';
import {
  MAX_RING_PARTICLES,
  EASING,
  RING_RADIUS,
  RING_COVERAGE,
  EXPLODE_RANGE,
  EXPLODE_OFFSET,
  FIREWORK_LIFESPAN,
  LIFESPAN_DECREMENT,
  VELOCITY_CHANGE,
  TRAIL_SIZE,
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
    p.stroke(255);
    p.strokeWeight(4);
    p.background(0);

    // Setting mode to degrees for spawning ringParticles in circle
    p.angleMode(p.DEGREES);
    // Sets 0,0 to centre
    p.translate(p.width / 2, p.height / 2);
    // Max number of ringParticles
    p.frameRate(30);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, true);
  };

  p.draw = () => {
    p.background(0, 0, 0, 25); // easy trails but deletes rings quickly

    p.ellipse(p.mouseX,p.mouseY, 5,5);
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

    // If too many ringParticles on screen
    if (ringParticles.length > MAX_RING_PARTICLES) {
      // Delete old ringParticles (from beginning of array)
      ringParticles.splice(0, p.floor((ringParticles.length - MAX_RING_PARTICLES * 0.8) * EASING));
    }

    // Loop through the array and show each particle
    for (let i = 0; i < ringParticles.length; i++) {
      ringParticles[i].update();
      if (ringParticles[i].delete()) {
        ringParticles.splice(i, 1);
      } else {
        ringParticles[i].show();
      }
    }
  };
  // Spawn ringParticles in ring with centre mouse x and y coords
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

    update() {
      if (!this.exploded) {
        this._firingParticle.update(gravity);

        if (this._firingParticle.vel.y >= 0) {
          this.explode();
        }
      }

      for (let i = this._particles.length - 1; i >= 0; i--) {
        this._particles[i].update(gravity);

        if (this._particles[i].done()) {
          this._particles.splice(i, 1);
        }
      }
    }

    done() {
      return (this.exploded && this._particles.length === 0);
    }

    show() {
      if (!this.exploded) {
        this._firingParticle.show();
      }

      for (let i = 0; i < this._particles.length; i++) {
        this._particles[i].show();
      }
    }

    explode() {
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
    pos: p5.Vector;
    public isFirework: boolean;
    lifespan: number;
    private _acc: p5.Vector;
    rand: number;
    vel: p5.Vector;

    constructor(x: number, y: number, firework: boolean) {
      this.pos = p.createVector(x, y);
      this.isFirework = firework;
      this.lifespan = FIREWORK_LIFESPAN;
      this._acc = p.createVector(0, 0);
      this.rand = p.random(0, 3);
      this.vel = this.isFirework
        ? p.createVector(0, p.random(-12, -8))
        : p5.Vector.random2D().mult(p.random(2, 10));
    }

    update(force: p5.Vector) {
      if (!this.isFirework) {
        this.vel.mult(0.9);
        this.lifespan -= 4;
      }
      this._acc.add(force);
      this.vel.add(this._acc);
      this.pos.add(this.vel);
      this._acc.mult(0);
    }

    done() {
      return this.lifespan < 0;
    }

    show() {
      if (!this.isFirework) {
        // after explosion
        p.strokeWeight(6);
        p.stroke(255, 211, 97, this.lifespan);
      } else {
        p.strokeWeight(8);
      }

      const opacity = this.rand < 1 ? 0.2 : this.rand < 2 ? 0.4 : 0.6;
      p.stroke(`rgba(255,211,97,${opacity})`);
      p.point(this.pos.x, this.pos.y);
    }
  }

  class RingParticle {
    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    radius: number;
    time: number;
    explode: boolean;
    lifespan: number;
    history: p5.Vector[];

    constructor(x: number, y: number, theta: number) {
      this.pos = p.createVector(x, y); // Position
      this.vel = p.createVector(2, 2); // Velocity
      this.radius = RING_RADIUS; //3*noise(this.pos.x/250, this.pos.y/250)*5;
      this.vel.limit(5);
      this.acc = p.createVector(0.1, 0.1); // Acceleration
      this.vel.rotate(theta); // Rotate velocity to the given rotation
      this.acc.rotate(theta); // Rotate to the given rotation
      this.time = 0; // Time alive
      this.explode = false;

      this.lifespan = FIREWORK_LIFESPAN;
      this.history = [];
    }
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel); // Update position with velocity
      // If older than 40, be deleted next draw event
      if (this.time <= 40) {
        // If older than 15, reduce the size of the ringParticles every step
        if (this.time > 15) {
          this.radius -= 0.05;
        }
        this.time++;
      } else {
        if (this.lifespan == FIREWORK_LIFESPAN) {
          this.explode = true;
          this.acc.add(p.createVector(0, 0.3));

          this.vel = p5.Vector.random2D();
          this.vel.mult(p.random(2, 10));
        }
        this.vel.mult(VELOCITY_CHANGE); // vel change ***
        this.lifespan -= LIFESPAN_DECREMENT; // lifespan ***

        const v = p.createVector(this.pos.x, this.pos.y);
        this.history.push(v);

        //size of trail ***
        if (this.history.length > TRAIL_SIZE) {
          this.history.shift();
        }
      }
    }
    delete() {
      return this.lifespan < 0;
    }

    show() {
      if (this.explode == false) {
        p.noStroke();
        // Set colour based on average of x and y position
        p.fill(255, 211, 97, 204);

        // Draw point
        p.ellipse(this.pos.x, this.pos.y, this.radius);
      } else {
        p.strokeWeight(4);
        p.stroke(255, 211, 97, (this.lifespan * 3) / 5);

        for (let i = 0; i < this.history.length; i++) {
          const pos = this.history[i];
          p.point(pos.x, pos.y);
        }
      }
    }
  }
}
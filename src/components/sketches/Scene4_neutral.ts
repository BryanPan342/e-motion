import p5 from 'p5';
export default function sketch(p: p5): void {
  let canvas: p5.Renderer;

  const fireworks: Firework[] = [];
  const ringParticles: ringParticle[] = [];
  const max = 2880 + 1440;
  const easing = 0.05;
  let gravity: p5.Vector;
  const R_particle = 13; // Radius ring particle ***

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    //p.colorMode(p.HSB);
    canvas.id('p5-background');
    gravity = p.createVector(0, 0.095);
    p.stroke(255);
    p.strokeWeight(4);
    p.background(0);

    // Setting mode to degrees for spawning ringParticles in circle
    p.angleMode(p.DEGREES);
    p.background(0);
    // Sets 0,0 to centre
    p.translate(p.width / 2, p.height / 2);
    // Max number of ringParticles
    p.frameRate(30);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, true);
  };

  p.draw = () => {
    //p.colorMode(p.RGB);
    // p.background(0);
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
    if (ringParticles.length > max) {
      // Delete old ringParticles (from beginning of array)
      ringParticles.splice(0, p.floor((ringParticles.length - max * 0.8) * easing));
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
    for (let i = 0; i < 360; i += 4) {
      const c = new ringParticle(p.mouseX, p.mouseY, i);
      ringParticles.push(c);
    }
  };

  class Firework {
    explodeSize: number;
    firework: Particle;
    exploded: boolean;
    particles: Array<Particle>;

    constructor() {
      this.explodeSize = p.random(0, 6);
      this.firework = new Particle(p.random(p.width), p.height, true);
      this.exploded = false;
      this.particles = [];
    }

    update() {
      if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.update();

        if (this.firework.vel.y >= 0) {
          this.exploded = true;
          this.explode();
        }
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity);
        this.particles[i].update();

        if (this.particles[i].done()) {
          this.particles.splice(i, 1);
        }
      }
    }

    done() {
      if (this.exploded && this.particles.length === 0) {
        return true;
      } else {
        return false;
      }
    }

    show() {
      if (!this.exploded) {
        this.firework.show();
      }

      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
      }
    }

    explode() {
      for (let i = 0; i < this.explodeSize * 15; i++) {
        const particle = new Particle(this.firework.pos.x, this.firework.pos.y, false);
        this.particles.push(particle);
      }
    }
  }

  class Particle {
    pos: p5.Vector;
    firework: boolean;
    lifespan: number;
    acc: p5.Vector;
    ran: number;
    vel: p5.Vector;

    constructor(x: number, y: number, firework: boolean) {
      this.pos = p.createVector(x, y);
      this.firework = firework;
      this.lifespan = 255;
      this.acc = p.createVector(0, 0);
      this.ran = p.random(0, 3);
      if (this.firework) {
        this.vel = p.createVector(0, p.random(-12, -8));
      } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(p.random(2, 10));
      }
    }

    applyForce(force: p5.Vector) {
      this.acc.add(force);
    }

    update() {
      if (!this.firework) {
        this.vel.mult(0.9);
        this.lifespan -= 4;
      }

      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    done() {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    }

    show() {
      //p.colorMode(p.HSB);

      if (!this.firework) {
        // after explosion
        p.strokeWeight(6);
        p.stroke(255, 211, 97, this.lifespan);
      } else {
        p.strokeWeight(8);
        //stroke('rgba(255,255,0, 1)');
      }

      //let fireworkColor = "#ffd361";
      //fireworkColor.setAlpha(100);
      //stroke(fireworkColor);
      //fireworkColor.setAlpha(100);
      if (this.ran < 1) p.stroke('rgba(255,211,97,0.2)');
      else if (this.ran < 2) p.stroke('rgba(255,211,97,0.4)');
      else p.stroke('rgba(255,211,97,0.6)');

      p.point(this.pos.x, this.pos.y);
    }
  }

  class ringParticle {
    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    r: number;
    time: number;
    explode: boolean;
    lifespan: number;
    history: p5.Vector[];

    constructor(x: number, y: number, rot: number) {
      this.pos = p.createVector(x, y); // Position
      this.vel = p.createVector(2, 2); // Velocity
      this.r = R_particle; //3*noise(this.pos.x/250, this.pos.y/250)*5;
      this.vel.limit(5);
      this.acc = p.createVector(0.1, 0.1); // Acceleration
      this.vel.rotate(rot); // Rotate velocity to the given rotation (avoids complicated maths)
      this.acc.rotate(rot); // Rotate to the given rotation (avoids complicated maths)
      this.time = 0; // Time alive
      this.explode = false;

      this.lifespan = 255;
      this.history = [];
    }
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel); // Update position with velocity
      // If older than 40, be deleted next draw event
      if (this.time <= 40) {
        // If older than 15, reduce the size of the ringParticles every step
        if (this.time > 15) {
          this.r -= 0.05;
        }
        this.time++;
      } else {
        if (this.lifespan == 255) {
          this.explode = true;
          this.applyForce(p.createVector(0, 0.3));

          this.vel = p5.Vector.random2D();
          this.vel.mult(p.random(2, 10));
        }
        this.vel.mult(0.95); // vel change ***
        this.lifespan -= 5; // lifespan ***

        const v = p.createVector(this.pos.x, this.pos.y);
        // var v2 = createVector(this.pos.x,this.pos.y-1);
        // var v3 = createVector(this.pos.x,this.pos.y-2);

        this.history.push(v);
        // this.history.push(v2);
        // this.history.push(v3);

        //size of trail ***
        if (this.history.length > 10) {
          this.history.splice(0, 1);
        }
      }
    }
    applyForce(force: p5.Vector) {
      this.acc.add(force);
    }
    delete() {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    }

    show() {
      if (this.explode == false) {
        p.noStroke();
        // Set colour based on average of x and y position
        p.fill(255, 211, 97, 204);

        // Draw point
        p.ellipse(this.pos.x, this.pos.y, this.r);
      } else {
        p.strokeWeight(4);
        p.stroke(255, 211, 97, this.lifespan*3/5);
        // point(this.pos.x, this.pos.y);

        for (let i = 0; i < this.history.length; i++) {
          const pos = this.history[i];
          p.point(pos.x, pos.y);
        }
      }
    }
  }
}

import p5 from 'p5';
export default function sketch(p: p5): void {
  let canvas: p5.Renderer;

  const particles: Particle[] = [];
  const lineLength = 120;
  const repelRadius = window.innerWidth*0.15;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');

    const numParticles = Math.min(Math.floor(window.innerWidth / 10), 400);
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, true);
  };

  p.draw = () => {
    p.background(20);
    p.fill(255, 255, 255, 255);

    p.circle(p.mouseX, p.mouseY, 25);

    particles.forEach((particle, idx) => {
      particle.update();
      if (idx % 2 == 0) {
        particle.draw(true);
      } else {
        particle.draw(false);
      }
      particle.checkParticles();
    });
  };
  class Particle {
    pos: p5.Vector;
    vel: p5.Vector;
    size: number;
    constructor() {
      this.pos = p.createVector(
        p.random(window.innerWidth),
        p.random(window.innerHeight),
      );
      this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
      this.size = 5;
    }

    update() {
      this.pos.add(this.vel);
      this.edges();
    }

    repel() {
      const x = this.pos.x;
      const y = this.pos.y;
      //const windowOffset = window.innerWidth * window.innerHeight * 0.01;

      const dis = p.dist(x, y, p.mouseX, p.mouseY); // calculate distance btwn point and mouse
      const pct = p.map(dis, 0, 200, 1, 0, true); // determine which points are within 100 pixels of mouse?

      let cir = p.createVector(x, y);
      const mouse = p.createVector(p.mouseX, p.mouseY);
      const diff = p5.Vector.sub(cir, mouse); // vector from point to mouse
      diff.normalize(); // make this a unit vector
      cir = p5.Vector.add(cir, p5.Vector.mult(diff, pct * 50));

      p.circle(cir.x, cir.y, this.size * 2);
    }
    draw(moreOpaque: boolean) {
      p.noStroke();
      p.fill(`rgba(255, 255, 255, ${moreOpaque ? 0.25 : 0.5})`);
      this.repel();
    }

    edges() {
      if (this.pos.x < 0 || this.pos.x > window.innerWidth) {
        this.vel.x *= -1;
      }

      if (this.pos.y < 0 || this.pos.y > window.innerHeight) {
        this.vel.y *= -1;
      }
    }
    checkParticles() {
      const di = p.dist(p.mouseX, p.mouseY, this.pos.x, this.pos.y);
      if (di <= repelRadius) return;

      particles.forEach((particle: Particle) => {
        const d = p.dist(
          this.pos.x,
          this.pos.y,
          particle.pos.x,
          particle.pos.y,
        );
        if (d > lineLength) return;

        const di2 = p.dist(p.mouseX, p.mouseY, particle.pos.x, particle.pos.y);

        if (d < lineLength && di > repelRadius && di2 > repelRadius) {
          const alpha = p.map(d, 0, 120, 0, 0.25);
          p.stroke(`rgba(255, 255, 255, ${alpha})`);
          p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
        }
      });
    }
  }
}

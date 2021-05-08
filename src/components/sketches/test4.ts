import p5 from 'p5';
export default function sketch(p: p5): void {
  let canvas: p5.Renderer;

  const particles: Particle[] = [];
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');

    const particlesLength = Math.min(Math.floor(window.innerWidth / 10), 200); //note this line
    for (let i = 0; i < particlesLength; i++) {
      particles.push(new Particle());
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, false);
  };

  p.draw = () => {
    p.background(20);
    p.circle(p.mouseX, p.mouseY, 25);
    p.fill(255, 255, 255, 1);

    particles.forEach((particle, idx) => {
      particle.update();
      if (idx % 2 == 0) {
        particle.draw();
      } else {
        particle.draw2();
      }
      particle.checkParticles();
    });
  };
  class Particle {
    pos!: p5.Vector;
    vel: p5.Vector;
    size: number;
    constructor() {
      this.pos = p.createVector(p.random(windowWidth), p.random(windowHeight));
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
      //cir = cir+diff*pct*50;
      cir = p5.Vector.add(cir, p5.Vector.mult(diff, pct * 50));
      //circle(cir.x,cir.y, 5+8*pct);

      p.circle(cir.x, cir.y, this.size * 2);
      //circle(this.pos.x, this.pos.y, this.size * 2);
    }

    draw() {
      p.noStroke();
      p.fill('rgba(255, 255, 255, 0.5)');
      this.repel();
    }
    draw2() {
      p.noStroke();
      p.fill('rgba(255, 255, 255, 0.25)');
      this.repel();
    }

    edges() {
      if (this.pos.x < 0 || this.pos.x > windowWidth) {
        this.vel.x *= -1;
      }

      if (this.pos.y < 0 || this.pos.y > windowHeight) {
        this.vel.y *= -1;
      }
    }
    checkParticles() {
      particles.forEach((particle:Particle) => {
        const d = p.dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
        const di = p.dist(p.mouseX, p.mouseY, this.pos.x, this.pos.y);
        const di2 = p.dist(p.mouseX, p.mouseY, particle.pos.x, particle.pos.y);

        if (d < 120 && di > 150 && di2 > 150) {
          const alpha = p.map(d, 0, 120, 0, 0.25);
          p.stroke(`rgba(255, 255, 255, ${alpha})`);
          p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
        }
      });
    }
  }
}

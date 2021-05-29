import p5 from 'p5';
export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  let xo = 1;
  let yo = 1;
  const easing = 0.1;
  const points: p5.Vector[] = [];
  const mult = 0.005;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
    p.noiseDetail(2, 0.75);

    const density = 30; // number of points in each row.
    const space = window.innerWidth / density; // distance between each point

    for (let x = 0; x < window.innerWidth; x += space) {
      for (let y = 0; y < window.innerHeight; y += space) {
        const pp = p.createVector(x + p.random(-10, 10), y + p.random(-10, 10));
        points.push(pp);
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, false);
  };

  p.draw = () => {
    // p.background("black");

    p.noStroke();
    p.fill(255);
    for (let i = 0; i < points.length; i++) {
      const r = p.map(points[i].x, 0, window.innerWidth, 50, 255);
      const g = p.map(points[i].y, 0, window.innerWidth, 50, 255);
      const b = p.map(points[i].x, 0, window.innerWidth, 255, 50);
      // const alpha = p.map(p.dist(window.innerWidth/ 2, window.innerHeight / 2, points[i].x, points[i].y), 0, 350, 600, 0);
      p.fill(r, g, b);

      const angle = p.map(
        p.noise(points[i].x * mult, points[i].y * mult),
        0,
        1,
        0,
        720,
      );

      points[i].add(p.createVector(p.cos(angle), p.sin(angle)));
      p.ellipse(points[i].x, points[i].y, 6);
    }

    const dx = p.mouseX - xo;
    xo += dx * easing;

    const dy = p.mouseY - yo;
    yo += dy * easing;

    p.square(xo, yo, 66);
    p.fill('yellow');
    p.ellipse(p.mouseX, p.mouseY, 44);
    p.fill('red');
  };
}

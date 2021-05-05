import p5 from 'p5';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  let x = 1;
  let y = 1;
  const easing = 0.1;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');
    p.noStroke();
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, false);
  };

  p.draw = () => {
    p.background('black');

    const dx = p.mouseX - x;
    x += dx * easing;

    const dy = p.mouseY - y;
    y += dy * easing;

    p.ellipse(x, y, 66, 66);
  };
}
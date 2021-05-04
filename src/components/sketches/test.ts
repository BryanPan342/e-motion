import p5 from 'p5';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;

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
  };
}
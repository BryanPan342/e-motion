import p5 from 'p5';

export default function sketch(p: p5) {
  let canvas: p5.Renderer;
  let clock: number;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight - 100);
    canvas.id('p5-background');
    p.noStroke();
    clock = 0;
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight - 100, false);
  };

  p.draw = () => {
    p.background('black');
    clock++;
  };
}
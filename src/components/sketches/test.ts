import p5 from 'p5';
import v from '../styles/_variables.scss';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight - +v.textHeight.slice(0, -2));
    canvas.id('p5-background');
    p.noStroke();
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight - +v.textHeight.slice(0, -2), false);
  };

  p.draw = () => {
    p.background('black');
  };
}
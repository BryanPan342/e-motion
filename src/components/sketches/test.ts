import p5 from 'p5';
import v from '../styles/_variables.scss';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  const margin = +v.textHeight.slice(0, -2);

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight - margin);
    canvas.id('p5-background');
    p.noStroke();
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight - margin, false);
  };

  p.draw = () => {
    p.background('black');
  };
}
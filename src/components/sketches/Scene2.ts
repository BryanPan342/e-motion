import p5 from 'p5';
import Cloud from './components/Cloud';
import Rain from './components/Rain';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  let cloud: Cloud;
  let rain: Rain;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');

    p.noStroke();
    p.colorMode(p.HSB, 360);
    p.frameRate(60);
    rain = new Rain(p);
    cloud = new Cloud(window.innerWidth/4, window.innerHeight/4, rain, p);
  };

  p.draw = () => {
    p.background(20);
    cloud.draw();
    cloud.checkRain();
    rain.draw();

    p.noStroke();
    p.fill(255);
    p.circle(p.mouseX, p.mouseY, 25);
  };
}



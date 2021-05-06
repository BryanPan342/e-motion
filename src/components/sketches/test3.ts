import p5 from 'p5';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  let x = 1;
  let y = 1;
  const easing = 0.1;
  let points:p5.Vector[] = [];

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');


    const density = 50;  // number of points in each row.
    const space = window.innerWidth / density;  // distance between each point

    for (let x = 0; x < window.innerWidth; x += space) {
			for (let y = 0; y < window.innerHeight; y += space) {
				const pp = p.createVector(x, y);
				points.push(pp);
			}
		}


  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, false);
  };

  p.draw = () => {
    p.background('black');
    p.noStroke();
    p.fill(255);
    for (let i = 0; i < points.length; i++){
      const angle = p.map(p.noise(points[i].x,points[i].y) , 0 , 1 , 0 , 720);

      points[i].add(p.createVector(p.cos(angle),p.sin(angle)));
      p.ellipse(points[i].x, points[i].y, 1);
    }


    const dx = p.mouseX - x;
    x += dx * easing;

    const dy = p.mouseY - y;
    y += dy * easing;

    p.square(x, y, 66);
    p.fill('yellow');
    p.ellipse(p.mouseX, p.mouseY, 44);
    p.fill('red');
  };
}
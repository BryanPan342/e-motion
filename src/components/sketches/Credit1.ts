import p5 from "p5";

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  const fontsize = 40;

  p.setup = () => {
		canvas = p.createCanvas(window.innerWidth, window.innerHeight);
		canvas.id("p5-background");
		p.background(0);
		// Set text characteristics
		p.textFont('Helvetica');
		p.textSize(fontsize);
		p.textAlign(p.CENTER, p.CENTER);
	};
  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, true);
  };

  p.draw = () => {

    const s =
			'A thank you to Humans of New York for letting us recreate their story';
    p.fill(255);
    p.text(s, p.width * 0.5, p.height * 0.5);
  };
}

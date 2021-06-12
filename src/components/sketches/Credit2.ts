import p5 from "p5";

export default function sketch(p: p5): void {
	let canvas: p5.Renderer;
	const fontsize = 20;

	p.setup = () => {
		canvas = p.createCanvas(window.innerWidth, window.innerHeight);
		canvas.id("p5-background");
		p.background(0);
		// Set text characteristics
    p.textAlign(p.CENTER, p.CENTER);
	};
	p.windowResized = () => {
		p.resizeCanvas(window.innerWidth, window.innerHeight, true);
	};

	p.draw = () => {
		p.textFont("Baskerville");
		p.textSize(fontsize*1.5);
		const t = "Created By:";
		p.fill(255);
		p.text(t, p.width * 0.5, p.height * 0.27);

		p.textFont("Verdana");
		p.textSize(fontsize);
		const s = "Jo Bryan Katherine Ivan Maizah Rachel Forrest Christine";
		p.fill(255);
		p.text(s, p.width * 0.5, p.height * 0.38, 30);
	};
}

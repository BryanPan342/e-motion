export default function sketch1(p) {
	let canvas;

	p.setup = () => {
		canvas = p.createCanvas(1900, 1440);
		p.noStroke();
        p.rectMode(p.CENTER);
	};

	p.draw = () => {

        let mouseX = p.mouseX;
        let mouseY = p.mouseX;
        let height = p.height;
        let width = p.width;

		p.background(230);
		p.fill(244, 122, 158);
		p.rect(mouseX, height / 2, mouseY / 2 + 10, mouseY / 2 + 10);
		p.fill(237, 34, 93);

		let inverseX = width - mouseX;
		let inverseY = height - mouseY;
		p.rect(inverseX, height / 2, inverseY / 2 + 10, inverseY / 2 + 10);
	};

	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if (canvas)
			//Make sure the canvas has been created
			p.fill(newProps.color);
            p.resizeCanvas(newProps.width, newProps.height, true);
	};
}

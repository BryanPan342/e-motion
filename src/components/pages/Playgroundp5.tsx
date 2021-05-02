import React, { useState } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/sketch";
import sketch1 from "./sketches/sketch1";


function Playgroundp5(): JSX.Element {
	const [color, setColor] = useState(
		[Math.random() * 255, Math.random() * 255, Math.random() * 255],
	);
    const [canvasSize, setCanvasSize] = useState([0,0]);

	const randomColor = () => {
		setColor(
			[Math.random() * 255, Math.random() * 255, Math.random() * 255]
		);
	};

	return (
		<div>
			{/* <button onClick={randomColor}>Random Color</button>
			<P5Wrapper sketch={sketch} color={color}></P5Wrapper> */}
            <P5Wrapper sketch={sketch1} ></P5Wrapper>
		</div>
	);
}

export default Playgroundp5;

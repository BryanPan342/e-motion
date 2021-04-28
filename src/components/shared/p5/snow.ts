import p5 from 'p5';
/* eslint-disable no-undef, no-unused-vars */

// Tweakable parameters
const SNOWFLAKES_PER_LAYER = 200;
const MAX_SIZE = 10;
const GRAVITY = 0.75;
const LAYER_COUNT = 5;

const WIND_SPEED = 1;
const WIND_CHANGE = 0.0025;

interface Snowflake {
  x: number;
  y: number;
  mass: number;
  l: number;
};

//var SNOWFLAKES: [] = []
var SNOWFLAKES: (Array<Snowflake>)[] = []

const sketch = ( s ) => {

// Will run once when the sketch is opened
  s.setup = () => {
    s.createCanvas(1080, 1350);
    s.noStroke();

    // Initialize the snowflakes with random positions
    for (let l = 0; l < LAYER_COUNT; l++) {
      SNOWFLAKES.push([]);
      for (let i = 0; i < SNOWFLAKES_PER_LAYER; i++) {
        let randX = s.random(s.width)
        let randY = s.random(s.height)
        
        SNOWFLAKES[l].push({
          x: randX,
          y: randY,
          mass: s.random(0.75, 1.25),
          l: l + 1
        });
      }
    }
  }

  // Will run every frame (refreshes many times per second)
  s.draw = () => {
    s.background("brown");

    // Iterate through each snowflake to draw and update them
    for (let l = 0; l < SNOWFLAKES.length; l++) {
      const LAYER = SNOWFLAKES[l];

      for (let i = 0; i < LAYER.length; i++) {
        const snowflake = LAYER[i];
        let x = snowflake.x
        let y = snowflake.y
        
        var dis = s.dist(x,y, s.mouseX, s.mouseY);  // calculate distance btwn point and mouse
        var pct = s.map(dis, 0,100, 1,0, true);  // determine which points are within 100 pixels of mouse?
        
        let cir = s.createVector(x,y);  
        let mouse = s.createVector(s.mouseX, s.mouseY);
        let diff = p5.Vector.sub(cir, mouse);  // vector from point to mouse
        diff.normalize();  // make this a unit vector 
        //cir = cir+diff*pct*50;
        cir = p5.Vector.add(cir, p5.Vector.mult(diff, pct*50));
        //circle(cir.x,cir.y, 5+8*pct);
        
        s.circle(cir.x, cir.y, (snowflake.l * MAX_SIZE) / LAYER_COUNT);
        s.updateSnowflake(snowflake);
      }
    }
  }

  // Helper function to prepare a given snowflake for the next frame
  s.updateSnowflake = (snowflake:Snowflake) => {
    const diameter = (snowflake.l * MAX_SIZE) / LAYER_COUNT;
    if (snowflake.y > s.height + diameter) snowflake.y = -diameter;
    else snowflake.y += GRAVITY * snowflake.l * snowflake.mass;

    // Get the wind speed at the given layer and area of the page
    const wind =
      s.noise(snowflake.l, snowflake.y * WIND_CHANGE, s.frameCount * WIND_CHANGE) -
      0.5;
    if (snowflake.x > s.width + diameter) snowflake.x = -diameter;
    else if (snowflake.x < -diameter) snowflake.x = s.width + diameter;
    else snowflake.x += wind * WIND_SPEED * snowflake.l;
  }
}

const sketchInstance = new p5(sketch)
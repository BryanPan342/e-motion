// THREE
export const ASPECT_RATIO = (): number => window.innerWidth / window.innerHeight;

export const EASING = 0.05;

// SCENE 2 CONSTANTS
export const CLOUD_WIDTH_MIN = 100;
export const CLOUD_WIDTH_MAX = 120;
export const CLOUD_HEIGHT_MIN = 60;
export const CLOUD_HEIGHT_MAX = 80;

export const NUM_CLOUD_SECTION_PARTICLES = 150;
export const PARTICLE_DIAMETER = 15;

export const CLOUD_OFFSETS = [
  { x: (-1 * window.innerWidth) / 3, y: (-1 * window.innerHeight) / 14 },
  { x: (-1 * window.innerWidth) / 8, y: window.innerHeight / 14 },
  { x: window.innerWidth / 8, y: (-1 * window.innerHeight) / 9 },
  { x: window.innerWidth / 3, y: 0 },
];

export const CLOUD_SECTION_OFFSETS = [
  { x: -80, y: 0 }, // left
  { x: 80, y: 0 }, // right
  { x: 30, y: 30 }, // below
  { x: -20, y: -50 }, // above
];

export const RAIN_RATE = 15;
export const RAIN_RADIUS = 50;
export const NUM_RAIN = 3;
export const RAIN_Y_MAX = window.innerHeight * 3 / 4;

// SCENE 4 CONSTANTS
/**  How many lines have bubbles. range of (0 - 1)*/
export const BUBBLE_FREQUENCY = 0.9;
/**  How many bubbles are on each line*/
export const BUBBLE_FREQUENCY_ON_LINES = 0.04;
/**  range of (0 - 1) */
export const TRANSPARENCY = 0.3;
/**  range of (0 - 1) */
export const TRANSPARENCY_RADIUS = 100; // range of (0 - 1)
export const INC = 0.02;
export const INC_START = 0.001;
export const MAG_INC = 0.001;
export const SCL = 10;
export const NUM_PARTICLES = window.innerWidth*.20;
export const STROKE_WEIGHT = 7;

// SCENE 5 CONSTANTS
export const MAX_RING_PARTICLES = 2880 + 1440;
export const RING_RADIUS = 13;
export const RING_COVERAGE = 360; // in degrees (0 - 360)
export const EXPLODE_RANGE = 6;
export const EXPLODE_OFFSET = 15; // after a random number is generated from 1-EXPLODE_RANGE, it is multiplied by EXPLODE_OFFSET to get the total number of particles for a background firework
export const FIREWORK_LIFESPAN = 255;
export const LIFESPAN_DECREMENT = 5;
export const VELOCITY_CHANGE = 0.95;

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
export const RAIN_Y_MAX = (window.innerHeight * 3) / 4;


// SCENE 3 CONSTANTS
export const INIT_SPEED = 7;
export const INIT_PARTICLES_COUNT = 100;
export const ACCEL = 0.3;
export const PARTICLES_MAX = 150;

export const BALL_RADIUS = (): number => window.innerWidth / 100;

export const BOUNDARY_RADIUS = (): number => window.innerWidth * 0.32;
export const BOUNDARY_X = (): number => window.innerWidth * 0.4;
export const BOUNDARY_Y = (): number => window.innerHeight * 0.7;

// SCENE 5 CONSTANTS
export const MAX_RING_PARTICLES = 2880 + 1440;
export const RING_RADIUS = 13;
export const RING_COVERAGE = 360; // in degrees (0 - 360)
export const EXPLODE_RANGE = 6;
export const EXPLODE_OFFSET = 15; // after a random number is generated from 1-EXPLODE_RANGE, it is multiplied by EXPLODE_OFFSET to get the total number of particles for a background firework
export const FIREWORK_LIFESPAN = 255;
export const LIFESPAN_DECREMENT = 5;
export const VELOCITY_CHANGE = 0.95;
export const TRAIL_SIZE = 10;
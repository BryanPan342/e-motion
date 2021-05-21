// SCENE 2 CONSTANTS

export const CLOUD_WIDTH_MIN = 100;
export const CLOUD_WIDTH_MAX = 120;
export const CLOUD_HEIGHT_MIN = 60;
export const CLOUD_HEIGHT_MAX = 80;

export const NUM_CLOUD_SECTION_PARTICLES = 150;
export const PARTICLE_DIAMETER = 15;

export const CLOUD_SECTION_OFFSETS = [
  {x: -80, y: 0},     // left
  {x: 80, y: 0},     // right
  {x: 30, y: 30},     // below
  {x: -20, y: -50},     // above
];

export const RAIN_RATE = 15;
export const RAIN_RADIUS = 50;
export const NUM_RAIN = 3;
export const RAIN_Y_MAX = window.innerHeight * 3 / 4;
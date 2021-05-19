import p5 from 'p5';
import { Point, RainPoint } from '../../../utils';

const w = window.innerWidth, h = window.innerHeight;

const CLOUD_WIDTH_MIN = 100;
const CLOUD_WIDTH_MAX = 120;
const CLOUD_HEIGHT_MIN = 60;
const CLOUD_HEIGHT_MAX = 80;

const NUM_CLOUD_SECTION_PARTICLES = 120;
const PARTICLE_DIAMETER = 15;

const CLOUD_SECTION_OFFSETS = [
  {x: -80, y:   0},     // left
  {x:  80, y:   0},     // right
  {x:  30, y:  30},     // below
  {x: -20, y: -50},     // above
];

const RAIN_RATE = 15;
const RAIN_RADIUS = 50;
const NUM_RAIN = 3;
const RAIN_Y_MAX = h * 3 / 4;

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const inEllipse = (x: number, y: number, x_axis: number, y_axis: number) =>
  ((x**2 / x_axis**2) + (y**2 / y_axis**2)) <= 1;

const randInEllipse = (x_axis: number, y_axis: number): Point => {
  const x_range = [x_axis * -1, x_axis];
  const y_range = [y_axis* -1, y_axis];
  let m_x = rand(x_range[0], x_range[1]), m_y = rand(y_range[0], y_range[1]);
  
  while(!inEllipse(m_x, m_y, x_axis, y_axis)) {
    m_x = rand(x_range[0], x_range[1]);
    m_y = rand(y_range[0], y_range[1]);
  }
  return { x: m_x, y: m_y };
}

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
    rain = new Rain();
    cloud = new Cloud(w/4, h/4, rain);
  }
  
  p.draw = () => {
    p.background(20);
    cloud.move();
    cloud.draw();
    cloud.checkRain();
    rain.draw();
  }

  class Rain {
    private _rain: RainPoint[];
    constructor() {
      this._rain = [];
    }
    
    addRain(x: number, y: number) {
      const len = rand(50, 100);
      const velocity = rand(2, 5);
      const circle_offset = rand(30, len);
      this._rain.push({x, y, len, velocity, circle_offset});
    }
    
    draw() {
      const t_rain: RainPoint[] = [];

      p.stroke('rgba(0, 175, 231, 0.20)');
      p.strokeWeight(4);
  
      this._rain.forEach(({x, y, len, velocity, circle_offset}) => {
        p.line(x, y, x, y + len);
        p.circle(x, y + circle_offset, 4);
        const n_y = y + velocity;
        if (n_y < RAIN_Y_MAX) {
          t_rain.push({
            x,
            y: n_y,
            len: len * 1.02,
            velocity: velocity * 1.02,
            circle_offset: circle_offset * 1.02,
          });
        }
      });
      this._rain = t_rain;
    }
  }

  class Cloud {
    public clouds: _CloudSection[];
    constructor(p_x: number, p_y: number, p_rain: Rain) {
      this.clouds = CLOUD_SECTION_OFFSETS.map(({x, y}) => {
        return new _CloudSection(p_x + x, p_y + y, p_rain);
      });
    }
    
    public move() {
      this.clouds.forEach((c) => {
        // c.move(0.4, 0);
      });
    }
    
    public checkRain() {
      this.clouds.forEach(c => c.checkRain());
    }
    
    public draw() {
      this.clouds.forEach((c) => {
        c.draw();
      });
    }
  }

  class _CloudSection {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
  
    private rain: Rain;
    private particles: Point[];
  
    constructor(p_x: number, p_y: number, p_rain: Rain) {
      this.x = p_x;
      this.y = p_y;
      this.rain = p_rain;
      
      this.width = rand(CLOUD_WIDTH_MIN, CLOUD_WIDTH_MAX);
      this.height = rand(CLOUD_HEIGHT_MIN, CLOUD_HEIGHT_MAX);
      
      this.particles = Array(NUM_CLOUD_SECTION_PARTICLES).fill(0).map(() => {
        return randInEllipse(this.width, this.height);
      });
    }
    
    public move(d_x: number, d_y: number) {
      this.x += d_x;
      this.y += d_y;
    }
    
    public checkRain() {
      if (inEllipse(this.x - p.mouseX, this.y - p.mouseY, this.width, this.height)) {
        if (rand(0, RAIN_RATE) < 1) {
          Array(NUM_RAIN).fill(0).map(() => {
            const offset = rand(-1 * RAIN_RADIUS, RAIN_RADIUS);
            const r_x = p.mouseX + offset, r_y = p.mouseY + offset;
            if (inEllipse(this.x - r_x, this.y - r_y, this.width, this.height)) 
              this.rain.addRain(r_x, r_y);
          });
        }
      }
    }
    
    public draw() {
      p.fill('rgba(0, 175, 231, 0.20)');
      p.noStroke();
      this.particles.forEach(({x, y}) => {
        p.circle(this.x + x, this.y + y, PARTICLE_DIAMETER);
      });
    }
  }
}





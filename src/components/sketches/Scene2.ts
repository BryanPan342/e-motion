import p5 from 'p5';
import { inEllipse, Point, RainPoint, rand, randInEllipse } from '../../utils';
import {
  CLOUD_HEIGHT_MAX,
  CLOUD_HEIGHT_MIN,
  CLOUD_OFFSETS,
  CLOUD_SECTION_OFFSETS,
  CLOUD_WIDTH_MAX,
  CLOUD_WIDTH_MIN,
  NUM_CLOUD_SECTION_PARTICLES,
  NUM_RAIN,
  PARTICLE_DIAMETER,
  RAIN_RADIUS,
  RAIN_RATE,
  RAIN_Y_MAX,
} from '../../utils/constants';

export default function sketch(p: p5): void {
  let canvas: p5.Renderer;
  let clouds: Cloud[];
  let rain: Rain;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('p5-background');

    p.noStroke();
    p.colorMode(p.HSB, 360);
    p.frameRate(60);

    rain = new Rain();
    clouds = CLOUD_OFFSETS.map(({x, y}) =>
      new Cloud(window.innerWidth / 2 + x, window.innerHeight / 4 + y, rain));
  };

  p.draw = () => {
    p.background(20);
    clouds.forEach((cloud) => {
      cloud.draw();
      cloud.checkRain();
    });
    rain.draw();

    p.noStroke();
    p.fill(255);
    p.circle(p.mouseX, p.mouseY, 25);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight, true);
  };

  class Cloud {
    public clouds: _CloudSection[];

    constructor(p_x: number, p_y: number, p_rain: Rain) {
      this.clouds = CLOUD_SECTION_OFFSETS.map(({x, y}) => {
        return new _CloudSection(p_x + x, p_y + y, p_rain);
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

  class Rain {
    private _rain: RainPoint[];

    constructor() {
      this._rain = [];
    }

    addRain(x: number, y: number) {
      const len = rand(50, 100);
      const velocity = rand(6, 8);
      this._rain.push({x, y, len, velocity});
    }

    draw() {
      const t_rain: RainPoint[] = [];

      p.stroke('rgba(0, 175, 231, 0.20)');
      p.strokeWeight(4);

      this._rain.forEach(({x, y, len, velocity}) => {
        p.line(x, y, x, y + len);
        const n_y = y + velocity;
        if (n_y < RAIN_Y_MAX) {
          t_rain.push({ x, y: n_y, len, velocity: velocity * 1.02 });
        }
      });
      this._rain = t_rain;
    }
  }

  class _CloudSection {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    private _rain: Rain;
    private _particles: Point[];

    constructor(p_x: number, p_y: number, p_rain: Rain) {
      this.x = p_x;
      this.y = p_y;
      this._rain = p_rain;

      this.width = rand(CLOUD_WIDTH_MIN, CLOUD_WIDTH_MAX);
      this.height = rand(CLOUD_HEIGHT_MIN, CLOUD_HEIGHT_MAX);

      this._particles = Array(NUM_CLOUD_SECTION_PARTICLES).fill(0).map(() => {
        return randInEllipse(this.width, this.height);
      });
    }

    public checkRain() {
      if (inEllipse(this.x - p.mouseX, this.y - p.mouseY, this.width, this.height)) {
        if (rand(0, RAIN_RATE) < 1) {
          Array(NUM_RAIN).fill(0).map(() => {
            const offset = rand(-1 * RAIN_RADIUS, RAIN_RADIUS);
            const r_x = p.mouseX + offset, r_y = p.mouseY + offset;
            if (inEllipse(this.x - r_x, this.y - r_y, this.width, this.height))
              this._rain.addRain(r_x, r_y);
          });
        }
      }
    }

    public draw() {
      p.fill('rgba(0, 175, 231, 0.20)');
      p.noStroke();
      this._particles.forEach(({x, y}) => {
        p.circle(this.x + x, this.y + y, PARTICLE_DIAMETER);
      });
    }
  }
}



import p5 from 'p5';
import { inEllipse, Point, rand, randInEllipse } from '../../../utils';
import {
  CLOUD_HEIGHT_MAX,
  CLOUD_HEIGHT_MIN,
  CLOUD_SECTION_OFFSETS,
  CLOUD_WIDTH_MAX,
  CLOUD_WIDTH_MIN,
  NUM_CLOUD_SECTION_PARTICLES,
  NUM_RAIN,
  PARTICLE_DIAMETER,
  RAIN_RADIUS,
  RAIN_RATE,
} from '../../../utils/constants';
import Rain from './Rain';

export default class Cloud {
  public clouds: _CloudSection[];
  private _p: p5;

  constructor(p_x: number, p_y: number, p_rain: Rain, p: p5) {
    this.clouds = CLOUD_SECTION_OFFSETS.map(({x, y}) => {
      return new _CloudSection(p_x + x, p_y + y, p_rain, this._p);
    });
    this._p = p;
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

  private _rain: Rain;
  private _particles: Point[];
  private _p: p5;

  constructor(p_x: number, p_y: number, p_rain: Rain, p: p5) {
    this.x = p_x;
    this.y = p_y;
    this._rain = p_rain;
    this._p = p;

    this.width = rand(CLOUD_WIDTH_MIN, CLOUD_WIDTH_MAX);
    this.height = rand(CLOUD_HEIGHT_MIN, CLOUD_HEIGHT_MAX);

    this._particles = Array(NUM_CLOUD_SECTION_PARTICLES).fill(0).map(() => {
      return randInEllipse(this.width, this.height);
    });
  }

  public checkRain() {
    if (inEllipse(this.x - this._p.mouseX, this.y - this._p.mouseY, this.width, this.height)) {
      if (rand(0, RAIN_RATE) < 1) {
        Array(NUM_RAIN).fill(0).map(() => {
          const offset = rand(-1 * RAIN_RADIUS, RAIN_RADIUS);
          const r_x = this._p.mouseX + offset, r_y = this._p.mouseY + offset;
          if (inEllipse(this.x - r_x, this.y - r_y, this.width, this.height))
            this._rain.addRain(r_x, r_y);
        });
      }
    }
  }

  public draw() {
    this._p.fill('rgba(0, 175, 231, 0.20)');
    this._p.noStroke();
    this._particles.forEach(({x, y}) => {
      this._p.circle(this.x + x, this.y + y, PARTICLE_DIAMETER);
    });
  }
}
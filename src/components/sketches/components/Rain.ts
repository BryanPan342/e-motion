import p5 from 'p5';
import { RainPoint, RAIN_Y_MAX, rand } from '../../../utils';

export default class Rain {
  private _rain: RainPoint[];
  private _p: p5;

  constructor(p: p5) {
    this._rain = [];
    this._p = p;
  }

  addRain(x: number, y: number) {
    const len = rand(50, 100);
    const velocity = rand(6, 8);
    this._rain.push({x, y, len, velocity});
  }

  draw() {
    const t_rain: RainPoint[] = [];

    this._p.stroke('rgba(0, 175, 231, 0.20)');
    this._p.strokeWeight(4);

    this._rain.forEach(({x, y, len, velocity}) => {
      this._p.line(x, y, x, y + len);
      const n_y = y + velocity;
      if (n_y < RAIN_Y_MAX) {
        t_rain.push({
          x,
          y: n_y,
          len,
          velocity: velocity * 1.02,
        });
      }
    });
    this._rain = t_rain;
  }
}
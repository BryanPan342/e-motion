import { Point } from './types';

export const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export const inEllipse = (x: number, y: number, x_axis: number, y_axis: number) =>
  ((x**2 / x_axis**2) + (y**2 / y_axis**2)) <= 1;

export const randInEllipse = (x_axis: number, y_axis: number): Point => {
  const x_range = [x_axis * -1, x_axis];
  const y_range = [y_axis* -1, y_axis];
  let m_x = rand(x_range[0], x_range[1]), m_y = rand(y_range[0], y_range[1]);

  while(!inEllipse(m_x, m_y, x_axis, y_axis)) {
    m_x = rand(x_range[0], x_range[1]);
    m_y = rand(y_range[0], y_range[1]);
  }
  return { x: m_x, y: m_y };
};
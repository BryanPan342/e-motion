import p5 from 'p5';

export type P5_Sketch = (p: p5) => void;

export type UseP5 = [
  (node: HTMLElement | null) => void,
  p5 | null,
  HTMLElement | null,
];

export type ButtonRef = React.MutableRefObject<HTMLButtonElement | null>;

export type AnimeTarget = string | DOMTokenList;

export interface Point {
  x: number,
  y: number,
}

export interface RainPoint extends Point {
  len: number,
  velocity: number,
  circle_offset: number,
}
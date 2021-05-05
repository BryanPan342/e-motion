import anime from 'animejs';
import { AnimeTarget } from '.';

function extractTargets(targets: AnimeTarget): string {
  if (typeof targets === 'string') return targets;

  const classes: string[] = [];
  targets.forEach(t => classes.push(t));
  return classes.reduce((acc: string, v: string) => `${acc}.${v}`,'');
}

export function animateUp(targets: AnimeTarget, opacity?: number): void {
  const _targets = extractTargets(targets);
  anime({
    targets: _targets,
    opacity: [0, opacity ?? 1],
    easing: 'easeInOutQuart',
    duration: 750,
    translateY: ['50px', '0px'],
  });
}

export function animateLeft(targets: AnimeTarget, opacity?: number): void {
  const _targets = extractTargets(targets);
  anime({
    targets: _targets,
    opacity: [0, opacity ?? 1],
    easing: 'easeInOutQuart',
    duration: 750,
    translateX: ['-50px', '0px'],
  });
}

export function animateOutUp(targets: AnimeTarget): void {
  const _targets = extractTargets(targets);
  anime({
    targets: _targets,
    opacity: 0,
    easing: 'easeInOutQuart',
    duration: 500,
    translateY: ['0px', '-25px'],
  });
}

export function animateOutRight(targets: AnimeTarget): void {
  const _targets = extractTargets(targets);
  anime({
    targets: _targets,
    opacity: 0,
    easing: 'easeInOutQuart',
    duration: 500,
    translateX: ['0px', '50px'],
  });
}
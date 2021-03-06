import { ButtonRef, fade } from '.';

export const showButton = (ref: ButtonRef): void => {
  if (ref.current) {
    ref.current.style.visibility = 'visible';
    fade(`#${ref.current.id}`, true);
  }
};

export const hideButton = (ref: ButtonRef): void => {
  if (ref.current) {
    setTimeout(() => ref.current && (ref.current.style.visibility = 'hidden'), 1000);
    fade(`#${ref.current.id}`, false);
  }
};
// Easing
import { quadInOut } from 'svelte/easing'

export function pageIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
      opacity: ${eased};
      `;
    }
  };
}

export function pageOut(node, { delay, duration, marginTop }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        margin-top: -${marginTop}px;
        // position: absolute;
        opacity: ${eased};
      `;
    }
  };
}
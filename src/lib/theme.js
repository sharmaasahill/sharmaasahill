import { flushSync } from 'react-dom';

/*
 * Light/dark theme. The choice lives on <html data-theme> and in localStorage.
 * index.html applies a saved choice before first paint, so there is no flash.
 * Dark is the default because the site is designed dark-first.
 */

const KEY = 'theme';
const THEME_COLOR = { dark: '#0E131C', light: '#F4F6F8' };
const listeners = new Set();

export const getTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function apply(next) {
  const root = document.documentElement;
  if (next === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next]);
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', next);
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* private mode: the choice just won't persist */
  }
  // Render React's part (the portrait source) in the same frame, so a view transition captures it.
  flushSync(() => listeners.forEach((listener) => listener()));
}

export function setTheme(next) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(() => apply(next));
  else apply(next);
}

export const toggleTheme = () => setTheme(getTheme() === 'light' ? 'dark' : 'light');

import { useSyncExternalStore } from 'react';

/*
 * The current month as one number (year * 12 + month, January = 0).
 * The prerendered HTML is built with the build's month (__BUILD_MONTH__, "YYYY-MM", set in
 * vite.config.js), and hydration starts from that same value so the markup matches. React then
 * re-renders with the visitor's month, which only differs if the build is older than a month.
 */

const [BUILD_YEAR, BUILD_MONTH] = __BUILD_MONTH__.split('-').map(Number);
const built = () => BUILD_YEAR * 12 + BUILD_MONTH - 1;
const today = () => {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
};
const neverChanges = () => () => {};

export default function useMonth() {
  return useSyncExternalStore(neverChanges, today, built);
}

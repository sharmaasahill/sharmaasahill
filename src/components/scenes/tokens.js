// Colours, fonts and helpers shared by the build scenes (640×400 drawing space).

export const W = 640;
export const H = 400;

export const C = {
  text: '#e8eaed',
  copy: '#a6adb8',
  label: '#8a95a6',
  faint: '#5e6776',
  line: 'rgba(173,186,205,0.22)',
  lineSoft: 'rgba(173,186,205,0.12)',
  node: '#111925',
  nodeDeep: '#0d131d',
  hot: '#132a22',
  signal: '#3ddc97',
  signalLine: 'rgba(61,220,151,0.55)',
  signalSoft: 'rgba(61,220,151,0.13)',
  signalText: '#a6e8c8',
  danger: '#f28b82',
  dangerSoft: 'rgba(242,139,130,0.14)',
  amber: '#f2c66d',
  blue: '#8fb3ff',
  ink: '#06140d',
};

export const MONO = "'IBM Plex Mono', ui-monospace, monospace";
export const SANS = "'Manrope', system-ui, sans-serif";

/** Opacity for an element that is on in some steps and faded in others. */
export const show = (on, off = 0) => ({ opacity: on ? 1 : off });

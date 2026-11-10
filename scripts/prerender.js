/*
 * Last step of `npm run build`: renders the app to HTML with the server bundle
 * (dist-ssr/entry-server.js, from `vite build --ssr`) and writes it into dist/index.html.
 * Visitors then see the page before the JavaScript arrives, and React hydrates it.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverDir = path.join(root, 'dist-ssr');
const page = path.join(root, 'dist', 'index.html');
const MARKER = '<div id="root"></div>';

const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);
const template = await fs.readFile(page, 'utf8');
if (!template.includes(MARKER)) throw new Error(`prerender: ${MARKER} not found in dist/index.html`);

const html = render();
await fs.writeFile(page, template.replace(MARKER, `<div id="root">${html}</div>`));
await fs.rm(serverDir, { recursive: true, force: true });

console.log(`prerender: wrote ${(html.length / 1024).toFixed(1)} kB of markup into dist/index.html`);

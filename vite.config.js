import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Serves the /api folder during `npm run dev`.
 *
 * On Vercel these files run as serverless functions, but the plain Vite dev
 * server knows nothing about them. This mounts them locally with a minimal
 * req/res shim so the contact form behaves the same in dev and production.
 * Dev only — it does not affect the production build.
 */
function devApiRoutes(env) {
  return {
    name: 'dev-api-routes',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (!url.startsWith('/api/')) return next();

        const file = path.join(__dirname, `${url}.js`);
        try {
          // Cache-bust so edits to the handler are picked up without a restart.
          const mod = await server.ssrLoadModule(
            `${pathToFileURL(file).href}?t=${Date.now()}`
          );

          // Collect the body the way Vercel's Node runtime does.
          const raw = await new Promise((resolve) => {
            let buf = '';
            req.on('data', (c) => (buf += c));
            req.on('end', () => resolve(buf));
          });
          try {
            req.body = raw ? JSON.parse(raw) : undefined;
          } catch {
            req.body = raw;
          }

          // Minimal Express-ish response shim.
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (obj) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(obj));
            return res;
          };

          await mod.default(req, res);
        } catch (err) {
          server.config.logger.error(`[dev-api] ${url} failed: ${err?.stack || err}`);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: 'Dev API handler crashed. See terminal.' }));
        }
      });
    },
    config() {
      // Expose non-VITE_ server vars to the dev handler via process.env.
      for (const key of ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL']) {
        if (env[key]) process.env[key] = env[key];
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // '' prefix so server-only vars (no VITE_) are loaded too. These are used
  // only by the dev API middleware and never injected into client code.
  const env = loadEnv(mode, __dirname, '');

  return {
    plugins: [react(), devApiRoutes(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});

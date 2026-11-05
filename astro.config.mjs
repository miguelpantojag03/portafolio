// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Cambia SITE_URL cuando tengas dominio propio (ver README, "Conectar un dominio").
const SITE_URL = process.env.SITE_URL ?? 'https://miguelpantoja.vercel.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !/\/(mensaje-enviado|og)$/.test(page) })],
  env: {
    schema: {
      // Formulario de contacto. Son secretos de servidor: nunca llegan al navegador.
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});

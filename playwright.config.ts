import { defineConfig, devices } from '@playwright/test';

// Usa el Edge o Chrome instalado (PW_CHANNEL=chrome) para no descargar navegadores.
const channel = process.env.PW_CHANNEL ?? 'msedge';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4321', trace: 'retain-on-failure' },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], channel } },
    { name: 'movil', use: { ...devices['Pixel 7'], channel, viewport: { width: 360, height: 780 } } },
  ],
  // El adaptador de Vercel no tiene `astro preview`, así que las pruebas corren sobre el servidor de desarrollo.
  webServer: {
    command: 'npx astro dev --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

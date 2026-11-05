/**
 * Genera public/og.png (desde la página /og) y los íconos PNG (desde public/favicon.svg).
 * Uso: npm run build && npm run preview (en otra terminal) && npm run imagenes
 * Usa el Microsoft Edge o Chrome instalado: no descarga navegadores.
 */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const canal = process.env.PW_CHANNEL ?? 'msedge';

const navegador = await chromium.launch({ channel: canal });
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
await pagina.goto(`${BASE}/og`, { waitUntil: 'networkidle' });
await pagina.evaluate(() => document.fonts.ready);
await pagina.locator('.og').screenshot({ path: 'public/og.png' });
await navegador.close();
console.log('public/og.png');

const svg = await readFile('public/favicon.svg');
for (const [archivo, lado] of [
  ['public/apple-touch-icon.png', 180],
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
]) {
  await sharp(svg, { density: 600 }).resize(lado, lado).png().toFile(archivo);
  console.log(archivo);
}

// favicon.ico de 32 px: un ICO con una sola imagen PNG dentro.
const png32 = await sharp(svg, { density: 300 }).resize(32, 32).png().toBuffer();
const cabecera = Buffer.alloc(22);
cabecera.writeUInt16LE(0, 0);
cabecera.writeUInt16LE(1, 2);
cabecera.writeUInt16LE(1, 4);
cabecera.writeUInt8(32, 6);
cabecera.writeUInt8(32, 7);
cabecera.writeUInt16LE(1, 10);
cabecera.writeUInt16LE(32, 12);
cabecera.writeUInt32LE(png32.length, 14);
cabecera.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([cabecera, png32]));
console.log('public/favicon.ico');

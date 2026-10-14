import { cp, mkdir } from 'node:fs/promises';
await mkdir('public/assets', { recursive: true });
for (const directory of ['css', 'fonts', 'images', 'js']) {
  await cp(`assets/${directory}`, `public/assets/${directory}`, { recursive: true });
}

// Copies the stylesheet + fonts into dist/ and writes one theme file per preset.
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { presets, presetCSS } from '../dist/theme.js';

const root = new URL('..', import.meta.url);
const dist = new URL('dist/', root);

cpSync(new URL('styles/components.css', root), new URL('styles.css', dist));
cpSync(new URL('styles/fonts', root), new URL('fonts', dist), { recursive: true });

mkdirSync(new URL('themes', dist), { recursive: true });
for (const { id } of presets) writeFileSync(new URL(`themes/${id}.css`, dist), presetCSS(id));

console.log(`styles.css, fonts/ and ${presets.length} themes written to dist/`);

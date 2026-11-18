import test from 'node:test';
import assert from 'node:assert/strict';
import { defaults, presets, tokens, foregroundFor, presetCSS } from '../dist/theme.js';

const lum = (hex) => {
  const [r, g, b] = hex.match(/[a-f0-9]{2}/gi).map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

test('every preset meets WCAG AA text contrast in light and dark', () => {
  for (const p of presets) for (const dark of [false, true]) {
    const t = tokens({ ...defaults, preset: p.id, dark });
    for (const [fg, bg] of [
      ['--foreground', '--background'], ['--muted-foreground', '--card'],
      ['--muted-foreground', '--background'], ['--primary-foreground', '--primary'],
    ]) {
      const r = ratio(t[fg], t[bg]);
      assert.ok(r >= 4.5, `${p.id} ${dark ? 'dark' : 'light'} ${fg}/${bg} = ${r.toFixed(2)}`);
    }
  }
});

test('custom accents get a readable foreground', () => {
  for (const c of ['#ffffff', '#000000', '#ce4224', '#00ff00', '#eedd99']) assert.ok(ratio(c, foregroundFor(c)) >= 4.5);
});

test('geometry settings map to tokens', () => {
  const t = tokens({ ...defaults, pixel: 3, shadow: 8, density: 'compact' });
  assert.equal(t['--pixel'], '3px');
  assert.equal(t['--pixel-shadow'], '8px');
  assert.equal(t['--control-height'], '34px');
});

test('preset CSS has light and dark blocks', () => {
  const css = presetCSS('ocean');
  assert.match(css, /:root \{[\s\S]*color-scheme: light;/);
  assert.match(css, /\.dark, \[data-theme="dark"\] \{[\s\S]*color-scheme: dark;/);
});

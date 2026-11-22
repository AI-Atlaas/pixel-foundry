// Builds the live demos into out/, the static site that GitHub Pages serves
// and the GitBook "Pixel Foundry demo" block embeds:
//
//   out/frame.html?demo=<id>   the page inside each block: one demo
//   out/assets/                JS chunks (content-hashed) and fonts
//   out/demos.json             build id, package version and the demo list,
//                              read by the GitBook block
//   out/index.html             every demo on one page, for checking
//
// The demos use the installed @ai-atlaas/pixel-foundry. The "Deploy demos"
// workflow installs the version in the root package.json first.
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, 'out');
const pkgDir = join(root, 'node_modules/@ai-atlaas/pixel-foundry');
const pkgDist = join(pkgDir, 'dist');
const THEME = 'night-garden';

const demos = JSON.parse(await readFile(join(root, 'frame/demos/demos.json'), 'utf8'));
const { version } = JSON.parse(await readFile(join(pkgDir, 'package.json'), 'utf8'));

// `virtual:demos` gives the frame the demo list and one lazy import per demo,
// so each demo becomes its own small chunk next to a shared vendor chunk.
const virtualDemos = {
  name: 'virtual-demos',
  setup(b) {
    b.onResolve({ filter: /^virtual:demos$/ }, () => ({ path: 'demos', namespace: 'virtual' }));
    b.onLoad({ filter: /.*/, namespace: 'virtual' }, () => ({
      resolveDir: join(root, 'frame/demos'),
      loader: 'js',
      contents: [
        `export const demos = ${JSON.stringify(demos)};`,
        'export const loaders = {',
        ...demos.map((d) => `  ${JSON.stringify(d.id)}: () => import(${JSON.stringify(`./${d.id}.tsx`)}),`),
        '};',
      ].join('\n'),
    }));
  },
};

const result = await build({
  absWorkingDir: root,
  entryPoints: { main: 'frame/main.tsx' },
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  jsx: 'automatic',
  jsxImportSource: 'react',
  define: { 'process.env.NODE_ENV': '"production"' },
  entryNames: '[name]-[hash]',
  chunkNames: '[name]-[hash]',
  outdir: join(out, 'assets'),
  write: false,
  legalComments: 'none',
  plugins: [virtualDemos],
});

await rm(out, { recursive: true, force: true });
await mkdir(join(out, 'assets'), { recursive: true });

const hash = createHash('sha256');
let mainScript = '';
for (const file of result.outputFiles) {
  const name = basename(file.path);
  if (name.startsWith('main-')) mainScript = name;
  hash.update(name);
  await writeFile(join(out, 'assets', name), file.contents);
}

for (const font of ['pixelify-latin.ttf', 'plex-latin.ttf']) {
  await writeFile(join(out, 'assets', font), await readFile(join(pkgDist, 'fonts', font)));
}

// frame.html sits next to assets/, so the fonts are at assets/<file>.
const styles = (await readFile(join(pkgDist, 'styles.css'), 'utf8')).replaceAll('./fonts/', 'assets/');
const theme = await readFile(join(pkgDist, 'themes', `${THEME}.css`), 'utf8');
const frameCss = await readFile(join(root, 'frame/frame.css'), 'utf8');
const css = `${styles}\n${theme}\n${frameCss}`;
hash.update(css);

// Applied before first paint so a dark visitor never sees a light flash.
const modeScript = `try{var m=localStorage.getItem('pixel-foundry-demo-mode')}catch(e){}if(m?m==='dark':matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')`;

await writeFile(
  join(out, 'frame.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="robots" content="noindex">
<title>Pixel Foundry demo</title>
<script>${modeScript}</script>
<style>${css}</style>
<link rel="modulepreload" href="assets/${mainScript}">
</head>
<body>
<div id="root"></div>
<script type="module" src="assets/${mainScript}"></script>
</body>
</html>
`,
);

// The GitBook block reads this. `build` changes whenever the frames do, and the
// block adds it to each frame URL so browsers don't keep an old page.
const buildId = `${version}-${hash.digest('hex').slice(0, 10)}`;
await writeFile(join(out, 'demos.json'), `${JSON.stringify({ build: buildId, package: version, demos }, null, 2)}\n`);

const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
await writeFile(
  join(out, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Pixel Foundry demos</title>
<style>
  body { margin: 0; padding: 24px 16px; font: 15px/1.5 system-ui, sans-serif; background: #f6f6f4; color: #1d1d1b; }
  main { max-width: 760px; margin: 0 auto; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  h2 { font-size: 15px; margin: 32px 0 8px; }
  iframe { display: block; width: 100%; border: 1px solid #d9d9d4; border-radius: 6px; background: #fff; }
  @media (prefers-color-scheme: dark) {
    body { background: #161615; color: #ececea; }
    iframe { border-color: #3a3a37; background: #000; }
  }
</style>
</head>
<body>
<main>
<h1>Pixel Foundry demos</h1>
<p>The live demos embedded in the <a href="https://github.com/AI-Atlaas/pixel-foundry">Pixel Foundry</a> docs, using <code>@ai-atlaas/pixel-foundry@${escape(version)}</code>. Each frame sizes itself the way it does in GitBook.</p>
${demos.map((d) => `<h2>${escape(d.title)}</h2>\n<iframe src="frame.html?demo=${encodeURIComponent(d.id)}&amp;v=${buildId}" title="${escape(d.title)} demo" style="aspect-ratio: 720 / ${d.height}"></iframe>`).join('\n')}
</main>
<script>
  window.addEventListener('message', (event) => {
    const action = event.data && event.data.action;
    if (!action || action.action !== '@webframe.resize') return;
    for (const frame of document.querySelectorAll('iframe')) {
      if (frame.contentWindow === event.source) {
        frame.style.aspectRatio = 'auto';
        frame.style.height = action.size.height + 'px';
      }
    }
  });
</script>
</body>
</html>
`,
);

const files = result.outputFiles.length + 2;
console.log(`Built ${demos.length} demos with @ai-atlaas/pixel-foundry@${version} into out/ (${files} assets, build ${buildId})`);

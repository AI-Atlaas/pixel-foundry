// Serves the demo frames locally, the same way the integration serves them in
// GitBook, plus a stand-in host page at / that sizes each frame from its
// @webframe.resize messages. Run `npm run preview`, then open the printed URL.
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const port = Number(process.env.PORT) || 5182;
const outfile = join(root, 'node_modules/.cache/pixel-foundry-preview/serve.mjs');

await build({
  absWorkingDir: root,
  entryPoints: ['src/serve.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile,
});
const { serveFrameRequest } = await import(pathToFileURL(outfile).href);
const demos = JSON.parse(await readFile(join(root, 'frame/demos/demos.json'), 'utf8'));

const host = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Demo frames</title>
<style>
  body { margin: 0; padding: 24px 16px; font: 15px/1.5 system-ui, sans-serif; background: #f6f6f4; color: #1d1d1b; }
  main { max-width: 760px; margin: 0 auto; }
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
<p>Stand-in for a GitBook page. Each frame is sized from its own <code>@webframe.resize</code> messages.</p>
${demos.map((d) => `<h2>${d.title}</h2>\n<iframe src="/frame?demo=${d.id}&v=${Date.now()}" style="aspect-ratio: 720 / ${d.height}"></iframe>`).join('\n')}
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
</html>`;

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const response =
    url.pathname === '/'
      ? new Response(host, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
      : serveFrameRequest(new Request(url));
  const headers = Object.fromEntries(response.headers);
  // Pages change on every rebuild locally; GitBook busts them with ?v=<version>.
  if (headers['content-type']?.startsWith('text/html')) headers['cache-control'] = 'no-store';
  res.writeHead(response.status, headers);
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, () => console.log(`Demo frames at http://localhost:${port}/`));

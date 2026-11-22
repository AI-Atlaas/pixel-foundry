// Serves out/ locally, the way GitHub Pages serves it. `npm run preview`
// builds first; then open the printed URL to see every demo on one page.
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(dirname(fileURLToPath(import.meta.url))), 'out');
const port = Number(process.env.PORT) || 5182;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ttf': 'font/ttf',
};

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${port}`);
  const file = normalize(join(out, pathname.endsWith('/') ? `${pathname}index.html` : pathname));
  if (!file.startsWith(out)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    // Pages change on every rebuild locally, so don't let the browser keep them.
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, () => console.log(`Demos at http://localhost:${port}/`));

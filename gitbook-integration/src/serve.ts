// HTTP side of the integration: serves the demo frame page and its assets
// from the integration's own content endpoint.
//
//   <endpoint>/frame?demo=button   the demo page
//   <endpoint>/assets/<file>       JS chunks and fonts (names are content-hashed)
import { assets, css, mainScript } from './generated/assets';

// Applied before first paint so a dark visitor never sees a light flash.
const modeScript = `try{var m=localStorage.getItem('pixel-foundry-demo-mode')}catch(e){}if(m?m==='dark':matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')`;

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Pixel Foundry demo</title>
<script>${modeScript}</script>
<style>${css}</style>
<link rel="modulepreload" href="assets/${mainScript}">
</head>
<body>
<div id="root"></div>
<script type="module" src="assets/${mainScript}"></script>
</body>
</html>`;

function decode(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export function serveFrameRequest(request: Request): Response {
  const { pathname } = new URL(request.url);

  const asset = /\/assets\/([^/]+)$/.exec(pathname);
  if (asset) {
    const file = assets[asset[1]];
    if (!file) return new Response('Not found', { status: 404 });
    const body = file.encoding === 'base64' ? decode(file.body) : file.body;
    return new Response(body, {
      headers: {
        'Content-Type': file.type,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  if (pathname.endsWith('/frame')) {
    return new Response(page, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  return new Response('Not found', { status: 404 });
}

// The relay page the block embeds. GitBook only accepts resize messages from
// frames on its own integration domains, so this page, served by the
// integration, embeds the demo from GitHub Pages and passes its resize and
// ready messages up to GitBook.

/** Where GitHub Pages serves the demos. */
export const DEMOS_URL = 'https://ai-atlaas.github.io/pixel-foundry/';

export const RELAY_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Pixel Foundry demo</title>
<style>html,body{margin:0;height:100%;overflow:hidden}iframe{display:block;width:100%;height:100%;border:0}</style>
</head>
<body>
<iframe id="demo" title="Pixel Foundry demo"></iframe>
<script>
  var demos = new URL(${JSON.stringify(DEMOS_URL)});
  var frame = document.getElementById('demo');
  frame.src = new URL('frame.html' + location.search, demos).toString();
  window.addEventListener('message', function (event) {
    if (event.origin !== demos.origin || event.source !== frame.contentWindow) return;
    var action = event.data && event.data.action;
    if (action && (action.action === '@webframe.resize' || action.action === '@webframe.ready')) {
      window.parent.postMessage({ action: action }, '*');
    }
  });
</script>
</body>
</html>
`;

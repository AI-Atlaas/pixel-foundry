// The GitBook side: a "Pixel Foundry demo" block that shows one live demo in
// a webframe. In the editor it also shows a menu to pick which demo.
//
// The demos themselves live on GitHub Pages (built by scripts/build-pages.mjs
// and deployed by the "Deploy demos" workflow). The block reads the demo list
// from there, so new or changed demos appear without publishing the
// integration again.
//
// GitBook only accepts resize messages from frames on its own integration
// domains, so the block doesn't embed Pages directly. It embeds a small relay
// page served by this integration, which embeds the demo from Pages and passes
// its resize and ready messages up to GitBook.
import { createComponent, createIntegration } from '@gitbook/runtime';
import { DEMOS_URL, RELAY_PAGE } from './relay';

// Assumed block width before the frame reports its real size.
const STARTING_WIDTH = 720;
// Frame height when the demo list can't be loaded.
const FALLBACK_HEIGHT = 200;

type Demo = { id: string; title: string; height: number };
type DemoList = { build: string; demos: Demo[] };

async function loadDemoList(): Promise<DemoList | null> {
  try {
    const response = await fetch(new URL('demos.json', DEMOS_URL).toString());
    if (!response.ok) return null;
    const list = (await response.json()) as DemoList;
    return Array.isArray(list.demos) ? list : null;
  } catch {
    return null;
  }
}

const demoBlock = createComponent<{ demo?: string }, { demo: string }>({
  componentId: 'demo',
  initialState: (props) => ({ demo: props.demo || 'button' }),
  async render(element, { environment }) {
    const list = await loadDemoList();
    const id = element.state.demo;
    const info = list?.demos.find((d) => d.id === id) ?? { id, title: id, height: FALLBACK_HEIGHT };
    const editable = element.context.type === 'document' && element.context.editable;

    // Re-read the demo list hourly, or soon if Pages couldn't be reached.
    element.setCache({ maxAge: list ? 3600 : 60 });

    // The relay page passes this query on to frame.html on Pages.
    const url = new URL(`${environment.integration.urls.publicContentEndpoint}/frame`);
    url.searchParams.set('demo', info.id);
    if (list) url.searchParams.set('v', list.build);

    const frame = <webframe source={{ url: url.toString() }} aspectRatio={STARTING_WIDTH / info.height} />;

    if (!editable) return <block>{frame}</block>;

    const options = (list?.demos ?? [info]).map((d) => ({ id: d.id, label: d.title }));
    return (
      <block>
        <vstack>
          <select
            state="demo"
            initialValue={info.id}
            options={options}
            onValueChange={{
              action: '@editor.node.updateProps',
              props: { demo: element.dynamicState('demo') },
            }}
          />
          {frame}
        </vstack>
      </block>
    );
  },
});

export default createIntegration({
  fetch: async (request) => {
    if (new URL(request.url).pathname.endsWith('/frame')) {
      return new Response(RELAY_PAGE, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
      });
    }
    return new Response('Not found', { status: 404 });
  },
  components: [demoBlock],
});

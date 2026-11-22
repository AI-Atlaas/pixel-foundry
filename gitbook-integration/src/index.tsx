// The GitBook side: a "Pixel Foundry demo" block that shows one live demo in
// a webframe. In the editor it also shows a menu to pick which demo.
//
// The demos themselves live on GitHub Pages (built by scripts/build-pages.mjs
// and deployed by the "Deploy demos" workflow). The block reads the demo list
// from there, so new or changed demos appear without publishing the
// integration again.
import { createComponent, createIntegration } from '@gitbook/runtime';

/** Where GitHub Pages serves the demos. */
const DEMOS_URL = 'https://ai-atlaas.github.io/pixel-foundry/';

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
  async render(element) {
    const list = await loadDemoList();
    const id = element.state.demo;
    const info = list?.demos.find((d) => d.id === id) ?? { id, title: id, height: FALLBACK_HEIGHT };
    const editable = element.context.type === 'document' && element.context.editable;

    // Re-read the demo list hourly, or soon if Pages couldn't be reached.
    element.setCache({ maxAge: list ? 3600 : 60 });

    const url = new URL('frame.html', DEMOS_URL);
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
  components: [demoBlock],
});

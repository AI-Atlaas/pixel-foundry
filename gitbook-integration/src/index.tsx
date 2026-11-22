// The GitBook side: a "Pixel Foundry demo" block that shows one live demo in
// a webframe. In the editor it also shows a menu to pick which demo.
import { createComponent, createIntegration } from '@gitbook/runtime';
import { demos } from './generated/assets';
import { serveFrameRequest } from './serve';

// Assumed block width before the frame reports its real size.
const STARTING_WIDTH = 720;

const demoBlock = createComponent<{ demo?: string }, { demo: string }>({
  componentId: 'demo',
  initialState: (props) => ({ demo: props.demo || demos[0].id }),
  async render(element, { environment }) {
    const info = demos.find((d) => d.id === element.state.demo) ?? demos[0];
    const editable = element.context.type === 'document' && element.context.editable;

    element.setCache({ maxAge: 86400 });

    const url = new URL(`${environment.integration.urls.publicContentEndpoint}/frame`);
    url.searchParams.set('demo', info.id);
    url.searchParams.set('v', String(environment.integration.version));

    const frame = <webframe source={{ url: url.toString() }} aspectRatio={STARTING_WIDTH / info.height} />;

    if (!editable) return <block>{frame}</block>;

    return (
      <block>
        <vstack>
          <select
            state="demo"
            initialValue={info.id}
            options={demos.map((d) => ({ id: d.id, label: d.title }))}
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
  fetch: async (request) => serveFrameRequest(request),
  components: [demoBlock],
});

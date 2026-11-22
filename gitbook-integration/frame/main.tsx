// The page shown inside each GitBook demo block. It reads the demo id from
// the URL, renders that demo, and keeps the frame's height in sync with it.
import { StrictMode, useEffect, useRef, useState, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { Icon } from '@ai-atlaas/pixel-foundry';
import { demos, loaders } from 'virtual:demos';

const MODE_KEY = 'pixel-foundry-demo-mode';

function sendToGitBook(action: Record<string, unknown>) {
  window.parent.postMessage({ action }, '*');
}

function saveMode(dark: boolean) {
  try {
    localStorage.setItem(MODE_KEY, dark ? 'dark' : 'light');
  } catch {
    // Storage can be blocked inside frames; the toggle still works for this view.
  }
}

function ModeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    saveMode(next);
    setDark(next);
  }

  return (
    <button
      type="button"
      className="px-button ghost frame-mode"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <Icon name={dark ? 'sun' : 'moon'} size={14} />
    </button>
  );
}

function Frame({ Demo, minHeight, top }: { Demo: ComponentType; minHeight: number; top?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  // Tell GitBook how tall the demo is, so the block fits it without scrolling.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = 0;
    const report = () => {
      const height = Math.max(minHeight, Math.ceil(el.getBoundingClientRect().height));
      const width = window.innerWidth;
      if (!width || height === last) return;
      last = height;
      sendToGitBook({ action: '@webframe.resize', size: { aspectRatio: width / height, height } });
    };
    const observer = new ResizeObserver(report);
    observer.observe(el);
    window.addEventListener('resize', report);
    report();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', report);
    };
  }, [minHeight]);

  return (
    <div ref={ref} className={top ? 'frame-root frame-top' : 'frame-root'} style={{ minHeight }}>
      <ModeToggle />
      <div className="frame-stage">
        <Demo />
      </div>
    </div>
  );
}

function Missing({ id }: { id: string }) {
  return (
    <div className="frame-root frame-missing">
      <p>
        No demo called <code>{id || '(none)'}</code>. Pick one from the block's menu.
      </p>
    </div>
  );
}

async function start() {
  const id = new URLSearchParams(location.search).get('demo') ?? '';
  const info = demos.find((demo) => demo.id === id);
  const root = createRoot(document.getElementById('root')!);

  if (!info) {
    root.render(<Missing id={id} />);
  } else {
    const { default: Demo } = await loaders[info.id]();
    root.render(
      <StrictMode>
        <Frame Demo={Demo} minHeight={info.height} top={info.top} />
      </StrictMode>,
    );
  }
  sendToGitBook({ action: '@webframe.ready' });
}

start();

// Generated at build time by scripts/build-pages.mjs from frame/demos/demos.json.
declare module 'virtual:demos' {
  import type { ComponentType } from 'react';

  export interface DemoInfo {
    id: string;
    title: string;
    /** Smallest frame height in pixels; leaves room for popups. */
    height: number;
    /** Pin the demo near the top so its popup opens downward with room. */
    top?: boolean;
  }

  export const demos: DemoInfo[];
  export const loaders: Record<string, () => Promise<{ default: ComponentType }>>;
}

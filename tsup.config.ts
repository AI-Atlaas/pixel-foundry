import { defineConfig } from 'tsup';

export default defineConfig([
  {
    // Components: one client bundle for React Server Components frameworks (Next.js app router).
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    dts: true,
    sourcemap: true,
    external: ['react', 'react-dom', '@base-ui/react', 'pixelarticons'],
    banner: { js: '"use client";' },
  },
  {
    // Theme helpers only: no React, usable on the server and in build scripts.
    entry: { theme: 'src/theme.ts' },
    format: ['esm'],
    dts: true,
    sourcemap: true,
  },
]);

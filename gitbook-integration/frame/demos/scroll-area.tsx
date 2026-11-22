import { PixelScrollArea } from '@ai-atlaas/pixel-foundry';

const entries = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  text: `v0.${12 - i}.0 · Fixed ${i + 1} pixels that were slightly off`,
}));

export default function ScrollAreaDemo() {
  return (
    <PixelScrollArea label="Changelog">
      {entries.map((e) => <p key={e.id}>{e.text}</p>)}
    </PixelScrollArea>
  );
}

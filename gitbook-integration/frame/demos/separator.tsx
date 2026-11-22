import { PixelSeparator } from '@ai-atlaas/pixel-foundry';

export default function SeparatorDemo() {
  return (
    <div className="demo-stack">
      <p>Inventory</p>
      <PixelSeparator />
      <div className="demo-row">
        <span>Sword</span>
        <PixelSeparator orientation="vertical" />
        <span>Shield</span>
        <PixelSeparator orientation="vertical" />
        <span>Potion</span>
      </div>
    </div>
  );
}

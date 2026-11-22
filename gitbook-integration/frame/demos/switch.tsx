import { PixelSwitch } from '@ai-atlaas/pixel-foundry';

export default function SwitchDemo() {
  return (
    <div className="demo-stack">
      <PixelSwitch label="Sound effects" defaultChecked />
      <PixelSwitch label="Music" />
      <PixelSwitch label="Cloud saves" disabled />
    </div>
  );
}

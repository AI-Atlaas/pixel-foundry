import { PixelMeter } from '@ai-atlaas/pixel-foundry';

export default function MeterDemo() {
  return (
    <div className="demo-stack demo-wide">
      <PixelMeter label="Rating" value={4.6} max={5} unit="stars" />
      <PixelMeter label="Storage" value={72} max={100} unit="%" />
    </div>
  );
}

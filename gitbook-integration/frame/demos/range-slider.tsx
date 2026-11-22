import { PixelRangeSlider } from '@ai-atlaas/pixel-foundry';

export default function RangeSliderDemo() {
  return (
    <div className="demo-wide">
      <PixelRangeSlider label="Monthly budget" min={0} max={500} step={10} initial={[40, 200]} currency="EUR" />
    </div>
  );
}

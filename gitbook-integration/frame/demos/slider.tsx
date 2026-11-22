import { useState } from 'react';
import { PixelSlider } from '@ai-atlaas/pixel-foundry';

export default function SliderDemo() {
  const [power, setPower] = useState(68);

  return (
    <div className="demo-wide">
      <PixelSlider label="Power level" value={power} onChange={setPower} />
    </div>
  );
}

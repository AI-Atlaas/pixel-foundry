import { useState } from 'react';
import { PixelTooltip } from '@ai-atlaas/pixel-foundry';

export default function TooltipDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="demo-row">
      <PixelTooltip
        label="Save"
        text={saved ? 'Saved to your shortlist' : 'Save to your shortlist'}
        icon="heart"
        onClick={() => setSaved(!saved)}
      />
      <span className="demo-note">Hover or focus the button</span>
    </div>
  );
}

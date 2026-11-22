import { useState } from 'react';
import { PixelToggleGroup } from '@ai-atlaas/pixel-foundry';

export default function ToggleGroupDemo() {
  const [pricing, setPricing] = useState<string[]>(['free']);

  return (
    <div className="demo-stack">
      <PixelToggleGroup
        label="Pricing"
        defaultValue="free"
        options={[
          { value: 'free', label: 'Free' },
          { value: 'paid', label: 'Paid' },
          { value: 'trial', label: 'Trial' },
        ]}
        onValueChange={setPricing}
      />
      <p className="demo-note">Pricing: {pricing.join(', ') || 'any'}</p>
    </div>
  );
}

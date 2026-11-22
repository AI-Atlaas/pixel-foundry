import { useState } from 'react';
import { PixelRadioGroup } from '@ai-atlaas/pixel-foundry';

export default function RadioGroupDemo() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="demo-stack">
      <PixelRadioGroup
        label="Billing"
        value={billing}
        onValueChange={setBilling}
        options={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'yearly', label: 'Yearly (save 20%)' },
        ]}
      />
      <p className="demo-note">Billing: {billing}</p>
    </div>
  );
}

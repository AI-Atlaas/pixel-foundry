import { useState } from 'react';
import { PixelCheckboxGroup } from '@ai-atlaas/pixel-foundry';

export default function CheckboxGroupDemo() {
  const [platforms, setPlatforms] = useState<string[]>(['Web']);

  return (
    <div className="demo-stack">
      <PixelCheckboxGroup
        label="Platforms"
        options={['Web', 'iOS', 'Android']}
        defaultValue={['Web']}
        onValueChange={setPlatforms}
      />
      <p className="demo-note">Selected: {platforms.join(', ') || 'none'}</p>
    </div>
  );
}

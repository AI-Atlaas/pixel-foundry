import { useState } from 'react';
import { PixelCheckbox } from '@ai-atlaas/pixel-foundry';

export default function CheckboxDemo() {
  const [agree, setAgree] = useState(false);

  return (
    <div className="demo-stack">
      <PixelCheckbox defaultChecked>Remember my progress</PixelCheckbox>
      <PixelCheckbox checked={agree} onCheckedChange={setAgree}>I agree to the quest rules</PixelCheckbox>
      <PixelCheckbox disabled>Hardcore mode (locked)</PixelCheckbox>
    </div>
  );
}

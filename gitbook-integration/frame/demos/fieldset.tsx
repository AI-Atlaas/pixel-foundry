import { useState } from 'react';
import { PixelFieldset, PixelSwitch, PixelCheckbox, PixelButton } from '@ai-atlaas/pixel-foundry';

export default function FieldsetDemo() {
  const [editing, setEditing] = useState(true);

  return (
    <div className="demo-stack">
      <PixelFieldset legend="Shipping" disabled={!editing}>
        <PixelSwitch label="Express delivery" />
        <PixelCheckbox>Gift wrap</PixelCheckbox>
      </PixelFieldset>
      <PixelButton variant="outline" onClick={() => setEditing(!editing)}>
        {editing ? 'Lock fields' : 'Edit fields'}
      </PixelButton>
    </div>
  );
}

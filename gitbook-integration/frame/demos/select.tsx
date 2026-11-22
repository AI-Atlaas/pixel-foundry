import { useState } from 'react';
import { PixelSelect } from '@ai-atlaas/pixel-foundry';

export default function SelectDemo() {
  const [role, setRole] = useState('ranger');

  return (
    <PixelSelect
      label="Character class"
      value={role}
      onChange={setRole}
      options={[
        { label: 'Ranger', value: 'ranger' },
        { label: 'Mage', value: 'mage' },
        { label: 'Knight', value: 'knight' },
      ]}
    />
  );
}

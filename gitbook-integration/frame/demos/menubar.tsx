import { useState } from 'react';
import { PixelMenubar } from '@ai-atlaas/pixel-foundry';

export default function MenubarDemo() {
  const [last, setLast] = useState('none');
  const action = (label: string) => ({ label, onSelect: () => setLast(label) });

  return (
    <div className="demo-stack">
      <PixelMenubar
        label="Editor"
        groups={[
          { label: 'File', actions: [action('New'), action('Open'), action('Export')] },
          { label: 'Edit', actions: [action('Undo'), action('Redo')] },
          { label: 'View', actions: [action('Grid'), action('List')] },
        ]}
      />
      <p className="demo-note">Last action: {last}</p>
    </div>
  );
}

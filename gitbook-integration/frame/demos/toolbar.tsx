import { useState } from 'react';
import { PixelToolbar } from '@ai-atlaas/pixel-foundry';

export default function ToolbarDemo() {
  const [last, setLast] = useState('none');

  return (
    <div className="demo-stack">
      <PixelToolbar
        label="Listing actions"
        actions={[
          { label: 'Copy link', icon: 'copy', onClick: () => setLast('Copy link') },
          { label: 'Save', icon: 'heart', onClick: () => setLast('Save') },
          { label: 'Share', icon: 'external', onClick: () => setLast('Share') },
        ]}
      />
      <p className="demo-note">Last action: {last}</p>
    </div>
  );
}

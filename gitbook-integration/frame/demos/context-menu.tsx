import { useState } from 'react';
import { PixelContextMenu } from '@ai-atlaas/pixel-foundry';

export default function ContextMenuDemo() {
  const [last, setLast] = useState('none');

  return (
    <div className="demo-stack">
      <PixelContextMenu
        menuLabel="Listing actions"
        actions={[
          { label: 'Open', onSelect: () => setLast('Open') },
          { label: 'Copy link', onSelect: () => setLast('Copy link') },
          { label: 'Report', onSelect: () => setLast('Report') },
        ]}
      >
        <div className="demo-target">Right-click this card</div>
      </PixelContextMenu>
      <p className="demo-note">Last action: {last}</p>
    </div>
  );
}

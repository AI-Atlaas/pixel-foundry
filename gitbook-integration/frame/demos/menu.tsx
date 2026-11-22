import { useState } from 'react';
import { Menu } from '@base-ui/react/menu';
import { Icon } from '@ai-atlaas/pixel-foundry';

export default function MenuDemo() {
  const [last, setLast] = useState('none');

  return (
    <div className="demo-stack">
      <Menu.Root>
        <Menu.Trigger className="px-button secondary">
          Actions <Icon name="down" size={12} />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="px-positioner" sideOffset={6}>
            <Menu.Popup className="px-popup">
              <Menu.Item className="px-menu-item" onClick={() => setLast('Save progress')}>Save progress</Menu.Item>
              <Menu.Item className="px-menu-item" onClick={() => setLast('Invite a friend')}>Invite a friend</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <p className="demo-note">Last action: {last}</p>
    </div>
  );
}

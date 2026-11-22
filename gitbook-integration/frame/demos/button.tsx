import { useState } from 'react';
import { PixelButton, Icon } from '@ai-atlaas/pixel-foundry';

export default function ButtonDemo() {
  const [coins, setCoins] = useState(0);

  return (
    <div className="demo-row">
      <PixelButton onClick={() => setCoins(coins + 1)}>
        <Icon name="plus" size={12} /> Coins: {coins}
      </PixelButton>
      <PixelButton variant="secondary">Secondary</PixelButton>
      <PixelButton variant="outline">Outline</PixelButton>
      <PixelButton variant="ghost">Ghost</PixelButton>
      <PixelButton disabled>Unavailable</PixelButton>
    </div>
  );
}

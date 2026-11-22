import { PixelAvatar } from '@ai-atlaas/pixel-foundry';

export default function AvatarDemo() {
  return (
    <div className="demo-row">
      <PixelAvatar label="Moss Notes" initials="MN" />
      <PixelAvatar label="Pixel Pioneer" initials="PP" />
      <PixelAvatar label="Quest Log" initials="QL" />
    </div>
  );
}

import { useState } from 'react';
import { PixelButton, PixelModal } from '@ai-atlaas/pixel-foundry';

export default function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PixelButton onClick={() => setOpen(true)}>Open modal</PixelButton>
      <PixelModal
        open={open}
        onOpenChange={setOpen}
        eyebrow="SETTINGS / ACCOUNT"
        title="Ready for a new adventure?"
        description="Your progress stays with you."
      >
        <PixelButton onClick={() => setOpen(false)}>Let's go</PixelButton>
      </PixelModal>
    </>
  );
}

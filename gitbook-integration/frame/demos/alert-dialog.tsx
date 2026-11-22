import { useState } from 'react';
import { PixelAlertDialog } from '@ai-atlaas/pixel-foundry';

export default function AlertDialogDemo() {
  const [deleted, setDeleted] = useState(false);

  return deleted ? (
    <p>Listing deleted. <button className="px-button ghost" onClick={() => setDeleted(false)}>Undo</button></p>
  ) : (
    <PixelAlertDialog
      trigger="Delete listing"
      title="Delete this listing?"
      description="This can't be undone."
      confirm="Delete"
      onConfirm={() => setDeleted(true)}
    />
  );
}

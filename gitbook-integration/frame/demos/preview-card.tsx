import { PixelPreviewCard } from '@ai-atlaas/pixel-foundry';

export default function PreviewCardDemo() {
  return (
    <p>
      Hover the link:{' '}
      <PixelPreviewCard
        label="Moss Notes"
        href="#moss-notes"
        category="Writing"
        description="A calm notebook that drafts with you."
      />
    </p>
  );
}

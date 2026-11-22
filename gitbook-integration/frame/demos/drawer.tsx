import { PixelDrawer, PixelCheckboxGroup } from '@ai-atlaas/pixel-foundry';

export default function DrawerDemo() {
  return (
    <PixelDrawer trigger="Filters" title="Filter results" description="Narrow the list.">
      <PixelCheckboxGroup label="Pricing" options={['Free', 'Paid', 'Trial']} />
    </PixelDrawer>
  );
}

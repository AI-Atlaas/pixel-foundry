import { PixelNavigationMenu } from '@ai-atlaas/pixel-foundry';

export default function NavigationMenuDemo() {
  return (
    <PixelNavigationMenu
      label="Main"
      groups={[
        {
          label: 'Discover',
          links: [
            { label: 'New launches', href: '#new', description: 'Fresh this week' },
            { label: 'Top rated', href: '#top', description: 'Loved by players' },
          ],
        },
        { label: 'For makers', links: [{ label: 'Submit a product', href: '#submit' }] },
      ]}
    />
  );
}

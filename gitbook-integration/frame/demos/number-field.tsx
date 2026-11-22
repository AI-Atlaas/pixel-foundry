import { PixelNumberField } from '@ai-atlaas/pixel-foundry';

export default function NumberFieldDemo() {
  return <PixelNumberField label="Seats" min={1} max={50} defaultValue={5} />;
}

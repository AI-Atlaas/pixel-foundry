import { useState } from 'react';
import { PixelAutocomplete } from '@ai-atlaas/pixel-foundry';

export default function AutocompleteDemo() {
  const [query, setQuery] = useState('');

  return (
    <div className="demo-stack">
      <PixelAutocomplete
        label="Search tools"
        items={['Figma', 'Linear', 'Notion', 'Raycast', 'Arc', 'Obsidian']}
        placeholder="Try “Figma”"
        onValueChange={setQuery}
      />
      <p className="demo-note">Query: {query || '—'}</p>
    </div>
  );
}

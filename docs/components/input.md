---
description: Text inputs styled with the px-input class.
---

# Input

{% @pixel-foundry/demo demo="input" %}

Pixel Foundry has no text input wrapper. Use Base UI's `Input` (or a plain `<input>`) with the `px-input` class.

## Usage

```tsx
import { Input } from '@base-ui/react/input';

<label className="field-label" htmlFor="name">Player name</label>
<Input id="name" className="px-input" placeholder="e.g. pixel_pioneer" />
<Input className="px-input" aria-invalid="true" aria-label="Invalid name" />
```

`aria-invalid="true"` switches the input to the error style.

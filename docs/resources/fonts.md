---
description: The two open-source typefaces bundled with Pixel Foundry.
---

# Fonts

Both fonts are self-hosted: they ship inside the package at `@ai-atlaas/pixel-foundry/fonts/` and load from your own domain, with no external font service.

## Pixelify Sans

| | |
| --- | --- |
| Role | Display text and headings (`--font-pixel`) |
| File | `fonts/pixelify-latin.ttf` (Latin subset, ~50 KB) |
| Weights | 400–700 (variable) |
| Author | The Pixelify Sans Project Authors |
| Source | [github.com/eifetx/Pixelify-Sans](https://github.com/eifetx/Pixelify-Sans) |
| License | SIL Open Font License 1.1 (`fonts/Pixelify-OFL.txt`) |

## IBM Plex Mono

| | |
| --- | --- |
| Role | Body text, labels, controls, code (`--font-body`) |
| File | `fonts/plex-latin.ttf` (Latin subset, ~129 KB) |
| Weights | 400 |
| Author | IBM Corp. ("Plex" is a Reserved Font Name) |
| Source | [github.com/IBM/plex](https://github.com/IBM/plex) |
| License | SIL Open Font License 1.1 (`fonts/Plex-OFL.txt`) |

## What the license allows

The SIL Open Font License lets you use, embed and redistribute these fonts in your apps and websites, including commercial ones. You must keep the license text with the font files, and you can't sell the fonts on their own. If you modify a font, you can't publish it under a Reserved Font Name ("Plex").

Pixel Foundry ships the license files next to the fonts. If you copy the fonts elsewhere, copy the `*-OFL.txt` files too.

## Other scripts and languages

The bundled files are **Latin subsets**. For other scripts, install the full font families and override the tokens:

```css
:root {
  --font-body: "IBM Plex Mono", "IBM Plex Sans Arabic", monospace;
}
```

---
description: Pixelarticons, the icon set behind the Icon component.
---

# Icon pack

Pixel Foundry's UI icons come from **Pixelarticons**, a set of pixel-perfect icons drawn on a 24px grid.

| | |
| --- | --- |
| Package | [`pixelarticons`](https://www.npmjs.com/package/pixelarticons) 2.4.2 (installed as a dependency) |
| Set used | Base |
| Author | Gerrit Halfmann |
| Website | [pixelarticons.com](https://pixelarticons.com) |
| Documentation | [pixelarticons.com/docs](https://pixelarticons.com/docs/) |
| License | MIT (full text in `NOTICE.md`) |

## How Pixel Foundry uses it

* The [`Icon`](../components/icons.md) component wraps 23 Pixelarticons React components under short names (`check`, `close`, `down`, …).
* Icons render at 12, 24 or 48px only. 24px is the native grid, and 12px is for compact details such as checkmarks and carets.
* They use `shapeRendering="crispEdges"` and inherit `currentColor`, so they follow the theme automatically.

Pixel Foundry's **cursors** are original drawings, not part of Pixelarticons.

## License

Pixelarticons is MIT-licensed. You can use it in commercial projects, provided the copyright notice is kept. The notice ships in Pixel Foundry's `NOTICE.md`, and the `pixelarticons` package carries its own license file.

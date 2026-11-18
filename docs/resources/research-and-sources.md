---
description: The libraries and ideas that informed Pixel Foundry, and what we took from each.
---

# Research & sources

Pixel Foundry combines primary-source research with original design work. This page lists what was studied and which ideas were borrowed **conceptually**. Pixel Foundry's CSS recipes, components and cursor artwork are original.

## Foundations

### Base UI: the interaction layer

[Base UI](https://base-ui.com/react/overview/about) is an unstyled React primitive library from contributors associated with Radix, Material UI and Floating UI. Its components come without visual styles and expose parts, state attributes and CSS variables as styling hooks. That makes it a good foundation for a pixel theme: Pixel Foundry changes the look completely without rewriting keyboard or focus behavior. See its [styling handbook](https://base-ui.com/react/handbook/styling).

### shadcn/ui: the token system

[shadcn/ui](https://ui.shadcn.com/docs/theming) popularized semantic CSS variables: background/foreground, card, primary, muted, accent, border, input, ring and radius. Changing them in one place updates every component that reads them. Pixel Foundry keeps these names so palettes work with shadcn components too. shadcn/ui made Base UI its default foundation for new projects in July 2026 ([announcement](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)).

**Decision:** use Base UI directly for behavior, keep shadcn-compatible color names, and write original pixel CSS. Pixel Foundry is a custom Base UI theme with shadcn-style tokens. It is not an official shadcn preset or registry.

## Reference libraries

| Reference | What it offers | What Pixel Foundry took from it |
| --- | --- | --- |
| [NES.css](https://nostalgic-css.github.io/NES.css/) | An 8-bit CSS framework with a strong retro vocabulary | Crisp borders, tactile pressed states, a deliberately small palette. Behavior stays in Base UI |
| [8bitcn/ui](https://github.com/TheOrcDev/8bitcn-ui) | Retro components distributed as editable shadcn recipes | Keep component source easy to read and adapt |
| [Pixelact UI](https://github.com/pixelact-ui/pixelact-ui) | A pixel-themed shadcn registry using Tailwind and CSS variables | Make the look work beyond buttons: menus, forms, overlays |
| [NeoBrutalism](https://neobrutalism.com/) (formerly RetroUI) | Bold outlines and hard shadows | Hard shadows, combined with stepped pixel details and a quieter layout |
| [PixelArtUI React](https://github.com/Pixelartui/pixelartui-react) | Pixel components with a theme provider and a pixel-size setting | Treat pixel size as a system-wide setting (`--pixel`) |
| [React Pixel UI](https://github.com/Todari/react-pixel-ui) | Converts computed CSS on DOM elements into pixel effects | An alternative technique. Pixel Foundry uses explicit CSS recipes instead, for predictable geometry and a small bundle |

This comparison covers architecture and design vocabulary. It doesn't rank the libraries and isn't a review of their maintenance, security or accessibility.

## Assets

| Asset | Source | License |
| --- | --- | --- |
| UI icons | [Pixelarticons](https://pixelarticons.com) by Gerrit Halfmann | MIT |
| Display font | [Pixelify Sans](https://github.com/eifetx/Pixelify-Sans) | SIL OFL 1.1 |
| Body font | [IBM Plex Mono](https://github.com/IBM/plex) | SIL OFL 1.1 |
| Cursors | Original to Pixel Foundry | MIT (this project) |

See [Fonts](fonts.md), [Icon pack](icon-pack.md) and [License & credits](license.md).

## Review history

The visual system was reviewed during development on desktop (1440px), tablet (1024px) and mobile (390px), across several palettes in light and dark mode. The reviews led to:

* darker action and muted-text colors in Parchment, Arcade and Ocean, to meet contrast targets,
* a minimum control text size of 12px,
* 16px desktop and 14px mobile body text,
* a progress-bar fix so the fill uses the track's inner height at every border width,
* replacing hand-drawn UI icons with Pixelarticons.

These were agent-based design and QA reviews, not an external certification or a full WCAG audit.

## Further reading

1. [Base UI overview](https://base-ui.com/react/overview/about)
2. [Base UI styling](https://base-ui.com/react/handbook/styling)
3. [Base UI accessibility](https://base-ui.com/react/overview/accessibility)
4. [shadcn/ui theming](https://ui.shadcn.com/docs/theming)
5. [shadcn/ui: Base UI documentation](https://ui.shadcn.com/docs/changelog/2026-01-base-ui)
6. [shadcn/ui: Base UI as default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)

_Research date: 8 November 2026._

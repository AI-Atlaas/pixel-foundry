---
description: What Pixel Foundry handles, and what stays your responsibility.
---

# Accessibility

## What you get

* **Behavior from Base UI.** Keyboard navigation, focus trapping in dialogs, focus return on close, ARIA roles and states, and typeahead in lists all come from [Base UI](https://base-ui.com/react/overview/accessibility).
* **Contrast-checked palettes.** Every palette meets WCAG AA (at least 4.5:1) in light and dark mode for:
  * text on the background,
  * muted text on the background and on cards,
  * button text on the primary color.

  `npm test` checks this, so a palette change that breaks contrast fails the build. See the exact ratios on [Palettes](palettes.md).
* **Readable custom accents.** `applyTheme({ accent })` picks black or white button text, whichever contrasts more.
* **Visible focus.** Controls show a dashed, offset outline on keyboard focus, and wrappers never clip it.
* **Labels built in.** Wrappers require a `label` and wire it up as a visible label or an accessible name. Icon-only buttons get `aria-label`, and decorative icons are `aria-hidden`.
* **Alternatives for hard-to-reach gestures.** `PixelContextMenu` also renders a menu button, because right-click isn't available to everyone. `PixelAlertDialog` focuses **Cancel** first.
* **Reduced motion.** Button transitions and click sparks turn off when the user prefers reduced motion.
* **Touch.** Pixel cursors and click sparks are skipped on touch devices.

## What stays your responsibility

Pixel Foundry is a foundation, not a certification:

* Write meaningful labels, error messages and feedback text.
* Check contrast for custom colors on every surface you use them on.
* Keep touch targets large enough, especially in compact density.
* Test complete flows with a keyboard and a screen reader.

{% hint style="warning" %}
Pixel Foundry has had design and browser reviews, including keyboard checks of selects, menus, dialogs and tabs. It has not had a formal WCAG audit.
{% endhint %}

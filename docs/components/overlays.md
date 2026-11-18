---
description: Dialogs, drawers, popovers, preview cards, tooltips and toasts.
---

# Overlays

All overlays render in a portal, trap or return focus as needed, and close with <kbd>Esc</kbd>. Base UI handles that behavior.

## PixelModal

A controlled dialog with a title, an optional description and a close button.

```tsx
const [open, setOpen] = useState(false);

<PixelButton onClick={() => setOpen(true)}>Open</PixelButton>
<PixelModal
  open={open}
  onOpenChange={setOpen}
  eyebrow="SETTINGS / ACCOUNT"
  title="Ready for a new adventure?"
  description="Your progress stays with you."
>
  <PixelButton onClick={() => setOpen(false)}>Let's go</PixelButton>
</PixelModal>
```

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Whether the dialog is open |
| `onOpenChange` | `(open: boolean) => void` | Called on close button, <kbd>Esc</kbd> or backdrop click |
| `title` | `string` | Dialog heading, used as its accessible name |
| `description` | `string` | Optional supporting text |
| `eyebrow` | `string` | Optional small label above the title |
| `children` | `ReactNode` | Body and actions |

## PixelAlertDialog

A confirmation dialog for destructive actions. It renders its own trigger button. Focus starts on **Cancel**, so a stray <kbd>Enter</kbd> can't confirm by accident.

```tsx
<PixelAlertDialog
  trigger="Delete listing"
  title="Delete this listing?"
  description="This can't be undone."
  confirm="Delete"
  onConfirm={deleteListing}
/>
```

| Prop | Type |
| --- | --- |
| `trigger` | `string` (trigger button text) |
| `title` | `string` |
| `description` | `string` |
| `confirm` | `string` (confirm button text) |
| `onConfirm` | `() => void` |

## PixelDrawer

A side panel that slides in from the right and can be swiped closed on touch devices. It renders its own trigger button.

```tsx
<PixelDrawer trigger="Filters" title="Filter results" description="Narrow the list.">
  <PixelCheckboxGroup label="Pricing" options={['Free', 'Paid']} />
</PixelDrawer>
```

| Prop | Type |
| --- | --- |
| `trigger` | `string` |
| `title` | `string` |
| `description` | `string` |
| `children` | `ReactNode` |

## PixelPopover

A small panel attached to a trigger button with an info icon.

```tsx
<PixelPopover trigger="How ranking works" title="Ranking" description="Sorted by recent votes." />
```

| Prop | Type |
| --- | --- |
| `trigger` | `string` |
| `title` | `string` |
| `description` | `string` |
| `children` | `ReactNode` (optional extra content) |

## PixelPreviewCard

A link that shows a preview card when hovered or focused.

```tsx
<PixelPreviewCard
  label="Moss Notes"
  href="/tools/moss-notes"
  category="Writing"
  description="A calm notebook that drafts with you."
/>
```

| Prop | Type |
| --- | --- |
| `label` | `string` (link text) |
| `href` | `string` |
| `category` | `string` (badge) |
| `description` | `string` |

## PixelTooltip

An icon button with a tooltip. The tooltip text describes the button, and `label` is its accessible name.

```tsx
<PixelTooltip
  label="Save"
  text="Save to your shortlist"
  icon="heart"
  onClick={toggleSave}
  expanded={false}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Accessible name of the button |
| `text` | `string` | Tooltip content |
| `icon` | `IconName` | Button icon |
| `onClick` | `() => void` | |
| `expanded` | `boolean` | Optional `aria-expanded`, for buttons that toggle a panel |

For a tooltip on any other element, use Base UI's `Tooltip` with `className="px-tooltip"` on the popup.

## PixelToastTrigger

A button that shows a toast notification. Only one toast is shown at a time, and it hides after 6 seconds.

```tsx
<PixelToastTrigger label="Save search" title="Search saved" description="We'll tell you about new matches." />
```

| Prop | Type |
| --- | --- |
| `label` | `string` (button text) |
| `title` | `string` |
| `description` | `string` |

{% hint style="info" %}
To show toasts from anywhere in your app (after a network request, say), use Base UI's `Toast.Provider` and `Toast.useToastManager()` with the `px-toast-viewport`, `px-toast-content`, `px-toast-mark` and `px-toast-message` classes.
{% endhint %}

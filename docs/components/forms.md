---
description: Checkboxes, switches, radios, selects, comboboxes, sliders and fields.
---

# Forms

## PixelCheckbox

```tsx
<PixelCheckbox defaultChecked>Remember my progress</PixelCheckbox>
<PixelCheckbox checked={agree} onCheckedChange={setAgree}>I agree</PixelCheckbox>
```

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | The visible label. The whole row is clickable |
| …rest | Base UI `Checkbox.Root` props | `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, `name`, `value`, … |

## PixelCheckboxGroup

A labelled list of checkboxes that share one array value.

```tsx
<PixelCheckboxGroup
  label="Platforms"
  options={['Web', 'iOS', 'Android']}
  defaultValue={['Web']}
  onValueChange={setPlatforms}
/>
```

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `options` | `string[]` (each string is both value and label) |
| `defaultValue` | `string[]` |
| `value` | `string[]` |
| `onValueChange` | `(values: string[]) => void` |

## PixelSwitch

```tsx
<PixelSwitch label="Sound effects" defaultChecked />
```

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Visible label, shown before the switch |
| …rest | Base UI `Switch.Root` props | `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, … |

## PixelRadioGroup

A controlled radio group with a visible group label.

```tsx
const [billing, setBilling] = useState('monthly');

<PixelRadioGroup
  label="Billing"
  value={billing}
  onValueChange={setBilling}
  options={[
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly (save 20%)' },
  ]}
/>
```

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `options` | `{ value: string; label: string }[]` |
| `value` | `string` |
| `onValueChange` | `(value: string) => void` |

## PixelSelect

A controlled dropdown select with full keyboard support.

```tsx
const [role, setRole] = useState('ranger');

<PixelSelect
  label="Character class"
  value={role}
  onChange={setRole}
  options={[
    { label: 'Ranger', value: 'ranger' },
    { label: 'Mage', value: 'mage' },
    { label: 'Knight', value: 'knight' },
  ]}
/>
```

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `value` | `string` |
| `options` | `SelectOption[]`, i.e. `{ label: string; value: string }[]` |
| `onChange` | `(value: string) => void` |

## PixelCombobox

A searchable single-select with a clear button. The list filters as you type, and only listed values can be chosen.

```tsx
<PixelCombobox label="Category" items={['Writing', 'Design', 'Coding', 'Research']} />
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `items` | `string[]` | |
| `placeholder` | `string` | `'Search options…'` |

## PixelAutocomplete

A free-text input with suggestions. Unlike a combobox, any text is a valid value.

```tsx
<PixelAutocomplete
  label="Search tools"
  items={['Figma', 'Linear', 'Notion']}
  placeholder="Try “Figma”"
  onValueChange={setQuery}
/>
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `items` | `string[]` | |
| `value` | `string` | |
| `onValueChange` | `(value: string) => void` | |
| `placeholder` | `string` | `'Search…'` |

## PixelSlider

```tsx
const [power, setPower] = useState(68);

<PixelSlider label="Power level" value={power} onChange={setPower} />
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `value` | `number` | |
| `onChange` | `(value: number) => void` | |
| `min` | `number` | `0` |
| `max` | `number` | `100` |
| `step` | `number` | `1` |

## PixelRangeSlider

A two-thumb slider for a range of money. The values are formatted as currency.

```tsx
<PixelRangeSlider label="Monthly budget" min={0} max={500} step={10} initial={[40, 200]} currency="EUR" />
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `min`, `max` | `number` | |
| `step` | `number` | `1` |
| `initial` | `[number, number]` | |
| `currency` | ISO 4217 code | `'USD'` |

{% hint style="info" %}
`PixelRangeSlider` is uncontrolled. To read the values, use Base UI's `Slider` with the classes `px-slider px-range-slider`, `px-track`, `px-indicator` and `px-thumb`.
{% endhint %}

## PixelNumberField

A number input with − and + buttons and a hint showing the allowed range.

```tsx
<PixelNumberField label="Seats" min={1} max={50} defaultValue={5} />
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `min`, `max` | `number` | |
| `defaultValue` | `number` | |
| `step` | `number` | `1` |

## PixelOTPField

A one-time-code input with one box per digit. Pasting a whole code fills every box.

```tsx
<PixelOTPField label="Verification code" length={6} />
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `length` | `number` | `6` |

## PixelFieldset

Groups related fields under a legend. Setting `disabled` disables every control inside.

```tsx
<PixelFieldset legend="Shipping" disabled={!editing}>
  <PixelSwitch label="Express delivery" />
  <PixelCheckbox>Gift wrap</PixelCheckbox>
</PixelFieldset>
```

| Prop | Type |
| --- | --- |
| `legend` | `string` |
| `disabled` | `boolean` |
| `children` | `ReactNode` |

## Text inputs

Pixel Foundry has no text input wrapper. Use Base UI's `Input` (or a plain `<input>`) with the `px-input` class:

```tsx
import { Input } from '@base-ui/react/input';

<label className="field-label" htmlFor="name">Player name</label>
<Input id="name" className="px-input" placeholder="e.g. pixel_pioneer" />
<Input className="px-input" aria-invalid="true" aria-label="Invalid name" />
```

`aria-invalid="true"` switches the input to the error style.

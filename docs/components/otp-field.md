---
description: A one-time-code input with one box per digit.
---

# OTP field

![A six-box Verification code field](../.gitbook/assets/components/otp-field.png)

A one-time-code input with one box per digit. Pasting a whole code fills every box.

## Import

```tsx
import { PixelOTPField } from 'pixel-foundry';
```

## Usage

```tsx
<PixelOTPField label="Verification code" length={6} />
```

## Props

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `length` | `number` | `6` |

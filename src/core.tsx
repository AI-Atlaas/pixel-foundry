import type { ComponentProps, ReactNode } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { Checkbox } from '@base-ui/react/checkbox';
import { Switch } from '@base-ui/react/switch';
import { Select } from '@base-ui/react/select';
import { Slider } from '@base-ui/react/slider';
import { Dialog } from '@base-ui/react/dialog';
import { Icon } from './icon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export function PixelButton({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<typeof BaseButton> & { variant?: ButtonVariant }) {
  return <BaseButton className={`px-button ${variant} ${className}`.trim()} {...props} />;
}

export function PixelSwitch({ label, ...props }: ComponentProps<typeof Switch.Root> & { label: string }) {
  return (
    <label className="switch-label">
      <span>{label}</span>
      <Switch.Root className="px-switch" {...props}>
        <Switch.Thumb className="px-switch-thumb" />
      </Switch.Root>
    </label>
  );
}

export function PixelCheckbox({ children, ...props }: ComponentProps<typeof Checkbox.Root> & { children: ReactNode }) {
  return (
    <label className="check-label">
      <Checkbox.Root className="px-checkbox" {...props}>
        <Checkbox.Indicator><Icon name="check" size={14} /></Checkbox.Indicator>
      </Checkbox.Root>
      <span>{children}</span>
    </label>
  );
}

export function PixelSlider({ label, value, onChange, min = 0, max = 100, step = 1 }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <Slider.Root value={value} onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)} min={min} max={max} step={step}>
      <div className="slider-label"><Slider.Label>{label}</Slider.Label><Slider.Value /></div>
      <Slider.Control className="px-slider">
        <Slider.Track className="px-track">
          <Slider.Indicator className="px-indicator" />
          <Slider.Thumb className="px-thumb" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

export type SelectOption = { label: string; value: string };

export function PixelSelect({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}) {
  return (
    <Select.Root value={value} items={options} onValueChange={(v) => v && onChange(v)}>
      <Select.Label className="field-label">{label}</Select.Label>
      <Select.Trigger className="px-select">
        <Select.Value />
        <Select.Icon><Icon name="down" size={12} /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className="px-positioner" sideOffset={6} alignItemWithTrigger={false}>
          <Select.Popup className="px-popup">
            <Select.List>
              {options.map((o) => (
                <Select.Item className="px-menu-item" value={o.value} key={o.value}>
                  <Select.ItemText>{o.label}</Select.ItemText>
                  <Select.ItemIndicator><Icon name="check" size={12} /></Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

export function PixelModal({ open, onOpenChange, title, description, eyebrow, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** Small label above the title, e.g. "SETTINGS / ACCOUNT". */
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="px-backdrop" />
        <Dialog.Popup className="px-dialog">
          <div className="dialog-top">
            <span className="eyebrow">{eyebrow}</span>
            <Dialog.Close className="icon-button" aria-label="Close dialog"><Icon name="close" /></Dialog.Close>
          </div>
          <Dialog.Title className="pixel-title">{title}</Dialog.Title>
          {description && <Dialog.Description className="dialog-desc">{description}</Dialog.Description>}
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

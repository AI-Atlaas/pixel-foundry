
import { useId, useRef, useState, type ReactNode } from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { Avatar } from '@base-ui/react/avatar';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import { Collapsible } from '@base-ui/react/collapsible';
import { Combobox } from '@base-ui/react/combobox';
import { Drawer } from '@base-ui/react/drawer';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import { Popover } from '@base-ui/react/popover';
import { PreviewCard } from '@base-ui/react/preview-card';
import { ScrollArea } from '@base-ui/react/scroll-area';
import { Separator } from '@base-ui/react/separator';
import { Toast } from '@base-ui/react/toast';
import { Toggle } from '@base-ui/react/toggle';
import { Toolbar } from '@base-ui/react/toolbar';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { ContextMenu } from '@base-ui/react/context-menu';
import { Fieldset } from '@base-ui/react/fieldset';
import { Menu } from '@base-ui/react/menu';
import { Menubar } from '@base-ui/react/menubar';
import { Meter } from '@base-ui/react/meter';
import { NumberField } from '@base-ui/react/number-field';
import { OTPField } from '@base-ui/react/otp-field';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import { Slider } from '@base-ui/react/slider';
import { Tooltip } from '@base-ui/react/tooltip';
import { Icon, type IconName } from './icon';
import { PixelButton, PixelCheckbox } from './core';

export function PixelCombobox({
  label, items, placeholder = 'Search options…',
}: {
  label: string;
  items: string[];
  placeholder?: string;
}) {
  const id = useId();

  return (
    <Combobox.Root items={items}>
      <label className="field-label" htmlFor={id}>{label}</label>
      <Combobox.InputGroup className="px-combobox-group">
        <Combobox.Input id={id} className="px-input" placeholder={placeholder} />
        <div className="px-combobox-actions">
          <Combobox.Clear className="px-icon-control" aria-label="Clear selection">
            <Icon name="close" size={12} />
          </Combobox.Clear>
          <Combobox.Trigger className="px-icon-control" aria-label="Show options">
            <Icon name="down" size={12} />
          </Combobox.Trigger>
        </div>
      </Combobox.InputGroup>
      <Combobox.Portal>
        <Combobox.Positioner className="px-positioner" sideOffset={6} align="start">
          <Combobox.Popup className="px-popup px-combobox-popup">
            <Combobox.Empty className="px-combobox-empty">No matches found.</Combobox.Empty>
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item key={item} value={item} className="px-menu-item">
                  {item}
                  <Combobox.ItemIndicator><Icon name="check" size={12} /></Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

export function PixelPopover({
  trigger, title, description, children,
}: {
  trigger: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger className="px-button outline">
        <Icon name="info" /> {trigger}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="px-positioner" sideOffset={10} align="start">
          <Popover.Popup className="px-popup px-info-popover">
            <div className="px-overlay-heading">
              <Popover.Title className="px-overlay-title">{title}</Popover.Title>
              <Popover.Close className="px-icon-control" aria-label="Close popover">
                <Icon name="close" size={12} />
              </Popover.Close>
            </div>
            <Popover.Description className="px-overlay-description">{description}</Popover.Description>
            {children}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function PixelAlertDialog({
  trigger, title, description, confirm, onConfirm,
}: {
  trigger: string;
  title: string;
  description: string;
  confirm: string;
  onConfirm: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="px-button outline px-danger-outline">{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="px-backdrop" />
        <AlertDialog.Popup className="px-dialog" initialFocus={cancelRef}>
          <AlertDialog.Title className="pixel-title">{title}</AlertDialog.Title>
          <AlertDialog.Description className="dialog-desc">{description}</AlertDialog.Description>
          <div className="button-row">
            <AlertDialog.Close className="px-button outline" ref={cancelRef}>Cancel</AlertDialog.Close>
            <AlertDialog.Close className="px-button px-danger" onClick={onConfirm}>{confirm}</AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export function PixelDrawer({
  trigger, title, description, children,
}: {
  trigger: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger className="px-button outline">
        {trigger} <Icon name="arrow" size={12} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="px-backdrop" />
        <Drawer.Viewport className="px-drawer-viewport">
          <Drawer.Popup className="px-drawer">
            <Drawer.Content>
              <div className="px-overlay-heading">
                <Drawer.Title className="px-overlay-title">{title}</Drawer.Title>
                <Drawer.Close className="px-icon-control" aria-label="Close drawer">
                  <Icon name="close" />
                </Drawer.Close>
              </div>
              <Drawer.Description className="px-overlay-description">{description}</Drawer.Description>
              {children}
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function PixelToastTrigger({
  label, title, description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <Toast.Provider limit={1} timeout={6000}>
      <ToastLauncher label={label} title={title} description={description} />
      <Toast.Portal>
        <Toast.Viewport className="px-toast-viewport">
          <ToastMessages />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastLauncher({ label, title, description }: {
  label: string;
  title: string;
  description: string;
}) {
  const manager = Toast.useToastManager();

  function showToast() {
    manager.close();
    manager.add({ title, description });
  }

  return (
    <PixelButton variant="outline" onClick={showToast}>
      <Icon name="plus" size={12} /> {label}
    </PixelButton>
  );
}

function ToastMessages() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} className="px-toast-message">
      <Toast.Content className="px-toast-content">
        <span className="px-toast-mark"><Icon name="check" /></span>
        <div>
          <Toast.Title className="px-overlay-title" />
          <Toast.Description className="px-overlay-description" />
        </div>
        <Toast.Close className="px-icon-control" aria-label="Dismiss toast" aria-hidden={false}>
          <Icon name="close" size={12} />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}

export function PixelToggleGroup({ label, options, defaultValue, value, onValueChange }: {
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  value?: string[];
  onValueChange?: (values: string[]) => void;
}) {
  return (
    <ToggleGroup aria-label={label} defaultValue={[defaultValue]} value={value} onValueChange={onValueChange} className="px-toggle-group">
      {options.map((option) => (
        <Toggle key={option.value} value={option.value} className="px-toggle">
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

export function PixelScrollArea({ label, children }: { label: string; children: ReactNode }) {
  return (
    <ScrollArea.Root className="px-scroll-area">
      <ScrollArea.Viewport className="px-scroll-viewport" role="region" aria-label={label}>
        <ScrollArea.Content className="px-scroll-content">{children}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className="px-scrollbar">
        <ScrollArea.Thumb className="px-scroll-thumb" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export function PixelAvatar({ label, initials, src }: { label: string; initials: string; src?: string }) {
  return (
    <Avatar.Root className="px-avatar" role="img" aria-label={label}>
      {src && <Avatar.Image className="px-avatar-image" src={src} alt="" />}
      <Avatar.Fallback className="px-avatar-fallback">{initials}</Avatar.Fallback>
    </Avatar.Root>
  );
}

export type NavigationLink = { label: string; href: string; description?: string };

export function PixelNavigationMenu({
  label, groups,
}: {
  label: string;
  groups: { label: string; links: NavigationLink[] }[];
}) {
  return (
    <NavigationMenu.Root aria-label={label}>
      <NavigationMenu.List className="px-nav-list">
        {groups.map((group) => (
          <NavigationMenu.Item key={group.label} value={group.label}>
            <NavigationMenu.Trigger className="px-button outline">
              {group.label}
              <NavigationMenu.Icon className="px-nav-caret"><Icon name="down" size={12} /></NavigationMenu.Icon>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="px-nav-content">
              {group.links.map((link) => (
                <NavigationMenu.Link key={link.href} href={link.href} closeOnClick className="px-nav-link">
                  <strong>{link.label}</strong>
                  {link.description && <span>{link.description}</span>}
                </NavigationMenu.Link>
              ))}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner className="px-positioner px-nav-positioner" sideOffset={8} align="start">
          <NavigationMenu.Popup className="px-popup px-navigation-popup">
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

export function PixelCheckboxGroup({
  label, options, defaultValue, value, onValueChange,
}: {
  label: string;
  options: string[];
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (values: string[]) => void;
}) {
  const id = useId();

  return (
    <CheckboxGroup
      aria-labelledby={id}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className="px-filter-group"
    >
      <div id={id} className="field-label">{label}</div>
      {options.map((option) => <PixelCheckbox key={option} value={option}>{option}</PixelCheckbox>)}
    </CheckboxGroup>
  );
}

export function PixelPreviewCard({
  label, href, description, category,
}: {
  label: string;
  href: string;
  description: string;
  category: string;
}) {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href={href} className="px-preview-link">
        {label} <Icon name="external" size={12} />
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner className="px-positioner" sideOffset={8} align="start">
          <PreviewCard.Popup className="px-popup px-info-popover px-product-preview">
            <span className="px-badge">{category}</span>
            <strong className="px-overlay-title">{label}</strong>
            <p className="px-overlay-description">{description}</p>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}

export function PixelAutocomplete({
  label, items, value, onValueChange, placeholder = 'Search…',
}: {
  label: string;
  items: string[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const id = useId();

  return (
    <Autocomplete.Root items={items} value={value} onValueChange={onValueChange}>
      <label className="field-label" htmlFor={id}>{label}</label>
      <Autocomplete.Input id={id} className="px-input" placeholder={placeholder} />
      <Autocomplete.Portal>
        <Autocomplete.Positioner className="px-positioner" sideOffset={6} align="start">
          <Autocomplete.Popup className="px-popup px-combobox-popup">
            <Autocomplete.Empty className="px-combobox-empty">No suggestions.</Autocomplete.Empty>
            <Autocomplete.List>
              {(item: string) => (
                <Autocomplete.Item key={item} value={item} className="px-menu-item">
                  {item}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

export function PixelToolbar({ label, actions }: {
  label: string;
  actions: { label: string; icon: IconName; onClick: () => void }[];
}) {
  return (
    <Toolbar.Root className="px-toolbar" aria-label={label}>
      {actions.map((action) => (
        <Toolbar.Button
          key={action.label}
          aria-label={action.label}
          className="px-icon-control"
          onClick={action.onClick}
        >
          <Icon name={action.icon} />
        </Toolbar.Button>
      ))}
    </Toolbar.Root>
  );
}

export function PixelCollapsible({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Collapsible.Root className="px-collapsible">
      <Collapsible.Trigger className="px-button outline px-disclosure">
        {label} <Icon name="down" size={12} />
      </Collapsible.Trigger>
      <Collapsible.Panel className="px-disclosure-panel">{children}</Collapsible.Panel>
    </Collapsible.Root>
  );
}

export function PixelSeparator({ orientation = 'horizontal' }: {
  orientation?: 'horizontal' | 'vertical';
}) {
  return <Separator orientation={orientation} className="px-separator" />;
}

export type MenuAction = {
  label: string;
  onSelect: () => void;
};

function PixelActionMenu({ label, actions, menubar = false }: {
  label: string;
  actions: MenuAction[];
  menubar?: boolean;
}) {
  return (
    <Menu.Root>
      <Menu.Trigger className={menubar ? 'px-menubar-trigger' : 'px-button outline'}>
        {label}
        <Icon name="down" size={12} />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="px-positioner" sideOffset={6} align="start">
          <Menu.Popup className="px-popup px-action-popup">
            {actions.map((action) => (
              <Menu.Item key={action.label} className="px-menu-item" onClick={action.onSelect}>
                {action.label}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export function PixelContextMenu({ children, actions, menuLabel = 'Actions' }: {
  children: ReactNode;
  actions: MenuAction[];
  /** Label of the button that opens the same actions for keyboard and touch users. */
  menuLabel?: string;
}) {
  return (
    <div className="px-example">
      <ContextMenu.Root>
        <ContextMenu.Trigger className="px-context-target">{children}</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Positioner className="px-positioner">
            <ContextMenu.Popup className="px-popup px-action-popup">
              {actions.map((action) => (
                <ContextMenu.Item key={action.label} className="px-menu-item" onClick={action.onSelect}>
                  {action.label}
                </ContextMenu.Item>
              ))}
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      <PixelActionMenu label={menuLabel} actions={actions} />
    </div>
  );
}

export function PixelMenubar({ label, groups }: {
  label: string;
  groups: { label: string; actions: MenuAction[] }[];
}) {
  return (
    <Menubar aria-label={label} className="px-menubar">
      {groups.map((group) => <PixelActionMenu key={group.label} {...group} menubar />)}
    </Menubar>
  );
}

export function PixelFieldset({ legend, disabled, children }: {
  legend: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <Fieldset.Root className="px-fieldset" disabled={disabled}>
      <Fieldset.Legend className="px-fieldset-legend">{legend}</Fieldset.Legend>
      <div className="px-fieldset-fields">{children}</div>
    </Fieldset.Root>
  );
}

export function PixelMeter({ label, value, max, unit }: {
  label: string;
  value: number;
  max: number;
  unit?: string;
}) {
  const maximum = Number.isFinite(max) && max > 0 ? max : 1;
  const bounded = Number.isFinite(value) ? Math.max(0, Math.min(value, maximum)) : 0;

  return (
    <Meter.Root
      value={bounded}
      max={maximum}
      format={{ maximumFractionDigits: 2 }}
      getAriaValueText={(formatted) => formatted + ' out of ' + maximum + (unit ? ' ' + unit : '')}
    >
      <div className="slider-label">
        <Meter.Label>{label}</Meter.Label>
        <Meter.Value>{(formatted) => formatted + ' / ' + maximum}</Meter.Value>
      </div>
      <Meter.Track className="px-progress-track">
        <Meter.Indicator className="px-progress-indicator" style={{ height: '100%' }} />
      </Meter.Track>
    </Meter.Root>
  );
}

export function PixelNumberField({ label, min, max, defaultValue, step = 1 }: {
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  step?: number;
}) {
  const id = useId();
  const hintId = id + '-range';

  return (
    <NumberField.Root id={id} min={min} max={max} defaultValue={defaultValue} step={step}>
      <label className="field-label" htmlFor={id}>{label}</label>
      <NumberField.Group className="px-stepper">
        <NumberField.Decrement className="px-toggle" aria-label={'Decrease ' + label}>
          <Icon name="minus" />
        </NumberField.Decrement>
        <NumberField.Input className="px-input" aria-describedby={hintId} />
        <NumberField.Increment className="px-toggle" aria-label={'Increase ' + label}>
          <Icon name="plus" />
        </NumberField.Increment>
      </NumberField.Group>
      <p id={hintId} className="px-component-note">Range {min}–{max} · step {step}</p>
    </NumberField.Root>
  );
}

export function PixelOTPField({ label, length = 6 }: { label: string; length?: number }) {
  const id = useId();
  const hintId = id + '-hint';
  const [code, setCode] = useState('');

  return (
    <div>
      <label className="field-label" htmlFor={id}>{label}</label>
      <OTPField.Root
        id={id}
        length={length}
        value={code}
        onValueChange={setCode}
        autoComplete="off"
        inputMode="numeric"
        aria-describedby={hintId}
        className="px-otp"
        style={{ gridTemplateColumns: 'repeat(' + length + ', minmax(0, 42px))' }}
      >
        {Array.from({ length }, (_, index) => (
          <OTPField.Input
            key={index}
            className="px-input px-otp-slot"
            aria-label={index === 0 ? undefined : 'Digit ' + (index + 1) + ' of ' + length}
          />
        ))}
      </OTPField.Root>
      <p id={hintId} className="px-component-note">Enter or paste the {length}-digit code.</p>
      <p className="px-component-result" role="status">
        {code.length === length ? 'Code complete.' : ''}
      </p>
    </div>
  );
}

export function PixelToggle({ label, defaultPressed = false }: {
  label: string;
  defaultPressed?: boolean;
}) {
  return (
    <Toggle className="px-toggle px-single-toggle" defaultPressed={defaultPressed}>
      <Icon name="heart" /> {label}
    </Toggle>
  );
}

export function PixelTooltip({ label, text, icon, onClick, expanded }: {
  label: string;
  text: string;
  icon: IconName;
  onClick: () => void;
  expanded?: boolean;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger
          className="px-toggle"
          aria-label={label}
          aria-describedby={open ? id : undefined}
          aria-expanded={expanded}
          onClick={onClick}
        >
          <Icon name={icon} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner className="px-positioner" sideOffset={8}>
            <Tooltip.Popup id={id} role="tooltip" className="px-tooltip">{text}</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function PixelRadioGroup({ label, options, value, onValueChange }: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <div>
      <div className="field-label" id={id}>{label}</div>
      <RadioGroup
        className="px-radio-options"
        aria-labelledby={id}
        value={value}
        onValueChange={onValueChange}
      >
        {options.map((option) => (
          <label key={option.value} className="check-label">
            <Radio.Root className="px-radio" value={option.value}>
              <Radio.Indicator />
            </Radio.Root>
            {option.label}
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

export function PixelRangeSlider({ label, min, max, step = 1, initial, currency = 'USD' }: {
  label: string;
  min: number;
  max: number;
  step?: number;
  initial: [number, number];
  currency?: string;
}) {
  return (
    <Slider.Root
      min={min}
      max={max}
      step={step}
      defaultValue={initial}
      minStepsBetweenValues={1}
      thumbCollisionBehavior="none"
      format={{ style: 'currency', currency }}
    >
      <div className="slider-label">
        <Slider.Label>{label}</Slider.Label>
        <Slider.Value>{(formatted) => formatted.join(' – ')}</Slider.Value>
      </div>
      <Slider.Control className="px-slider px-range-slider">
        <Slider.Track className="px-track">
          <Slider.Indicator className="px-indicator" />
          <Slider.Thumb className="px-thumb" index={0} aria-label={'Minimum ' + label} />
          <Slider.Thumb className="px-thumb" index={1} aria-label={'Maximum ' + label} />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

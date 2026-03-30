import type { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import type { Placement } from '@floating-ui/react';

/** Sub-menu display mode */
export type MenuSubMode = 'inline' | 'popover';

/** Menu display mode */
export type MenuDisplay = 'default' | 'icon';

/** Popover sub-menu trigger type */
export type MenuSubTriggerType = 'hover' | 'click';

/* ─── Menu (Root) ─────────────────────────────────────────── */

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Menu items */
  children: ReactNode;
  /** Compact mode — smaller padding and text */
  dense?: boolean;
  /** Maximum height of the menu with scrollbar */
  maxHeight?: number | string;
  /** Default sub-menu mode for all nested MenuSub */
  mode?: MenuSubMode;
  /** Display mode: 'icon' shows only icons, 'default' shows all */
  display?: MenuDisplay;
}

/* ─── MenuItem ────────────────────────────────────────────── */

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Label content */
  children: ReactNode;
  /** Leading icon */
  icon?: ReactNode;
  /** Trailing keyboard shortcut text */
  shortcut?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Danger/destructive styling */
  danger?: boolean;
  /** Selected/active state */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
}

/* ─── MenuLabel ───────────────────────────────────────────── */

export interface MenuLabelProps {
  /** Label text */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Element ID */
  id?: string;
}

/* ─── MenuDivider ─────────────────────────────────────────── */

export interface MenuDividerProps {
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/* ─── MenuGroup ───────────────────────────────────────────── */

export interface MenuGroupProps {
  /** Menu items inside group */
  children: ReactNode;
  /** Optional group label (shorthand for MenuLabel) */
  label?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/* ─── MenuSub ─────────────────────────────────────────────── */

export interface MenuSubProps {
  /** Sub-menu content (MenuSubTrigger + MenuSubContent) */
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled initial open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Override parent sub-menu mode */
  mode?: MenuSubMode;
  /** Popover trigger type */
  trigger?: MenuSubTriggerType;
}

/* ─── MenuSubTrigger ──────────────────────────────────────── */

export interface MenuSubTriggerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Label content */
  children: ReactNode;
  /** Leading icon */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

/* ─── MenuSubContent ──────────────────────────────────────── */

export interface MenuSubContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Sub-menu items */
  children: ReactNode;
  /** Placement configuration for popover mode */
  placement?: Placement;
  /** Distance from trigger for popover mode */
  offset?: number;
}

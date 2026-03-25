import type { ReactNode, ReactElement, CSSProperties, HTMLAttributes } from 'react';
import type { Placement } from '@floating-ui/react';

/* ─── Menu (Root) ─────────────────────────────────────────── */

export interface MenuProps {
  /** Menu content (MenuTrigger + MenuContent) */
  children: ReactNode;
  /** Controlled open state (dropdown mode only) */
  open?: boolean;
  /** Uncontrolled initial open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** How the menu opens: click (default) or hover */
  triggerMode?: 'click' | 'hover';
}

/* ─── MenuTrigger ─────────────────────────────────────────── */

export interface MenuTriggerProps {
  /** Trigger element — must accept ref */
  children: ReactElement;
}

/* ─── MenuContent ─────────────────────────────────────────── */

export interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Menu items */
  children: ReactNode;
  /** Placement relative to trigger */
  placement?: Placement;
  /** Gap from trigger (px) */
  offset?: number;
  /** Max height before scroll */
  maxHeight?: number | string;
  /** Min width */
  minWidth?: number | string;
  /** Compact mode — smaller padding and text */
  dense?: boolean;
  /** Custom z-index */
  zIndex?: number;
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
  /** Selected state — shows check mark */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Auto-close menu after click (default: true) */
  closeOnClick?: boolean;
}

/* ─── MenuLabel ───────────────────────────────────────────── */

export interface MenuLabelProps {
  /** Label text */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
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

export type MenuSubMode = 'popover' | 'inline';

export interface MenuSubProps {
  /** Sub-menu content (MenuSubTrigger + MenuSubContent) */
  children: ReactNode;
  /** Sub-menu mode: popover (floating) or inline (collapse/expand) */
  mode?: MenuSubMode;
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled initial open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
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
  /** Placement (popover mode only) */
  placement?: Placement;
  /** Gap between parent menu and sub-menu (popover mode only) */
  offset?: number;
}

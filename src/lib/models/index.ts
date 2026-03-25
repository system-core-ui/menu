import type { ReactNode, CSSProperties, HTMLAttributes } from 'react';

/* ─── Menu (Root) ─────────────────────────────────────────── */

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Menu items */
  children: ReactNode;
  /** Compact mode — smaller padding and text */
  dense?: boolean;
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
}

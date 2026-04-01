import type { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import type { Placement } from '@floating-ui/react';

/** Sub-menu display mode */
export type MenuSubMode = 'inline' | 'popover';

/** Menu display mode */
export type MenuDisplay = 'default' | 'icon';

/** Popover sub-menu trigger type */
export type MenuSubTriggerType = 'hover' | 'click';

/** Floating UI settings for popover sub-menus */
export interface MenuFloatingSettings {
  /** Popover placement (e.g., 'right-start') */
  placement?: Placement;
  /** Distance in pixels between trigger and popover */
  offset?: number;
  /** Enable flip modifier to flip placement if space is limited */
  flip?: boolean;
  /** Enable shift modifier to shift popover to stay in view */
  shift?: boolean;
}

/* ─── Menu (Root) ─────────────────────────────────────────── */

/** Color scheme for customizing menu appearance via raw CSS color strings */
export interface MenuColorScheme {
  /** Menu container background */
  background?: string;
  /** Default text color */
  color?: string;

  /** Hover state */
  hoverBg?: string;
  hoverColor?: string;

  /** Active/selected item */
  activeBg?: string;
  activeColor?: string;

  /** Soft-selected (parent trigger of active child) */
  softSelectedBg?: string;

  /** Danger item */
  dangerColor?: string;
  dangerHoverBg?: string;

  /** Disabled text */
  disabledColor?: string;

  /** Secondary text (labels, shortcuts, arrows) */
  secondaryColor?: string;

  /** Divider line */
  dividerColor?: string;

  /** Focus ring color */
  focusRingColor?: string;

  /** Popover sub-menu background (nếu mode='popover') */
  popoverBg?: string;
  /** Popover border color */
  popoverBorderColor?: string;
  /** Dot indicator color for inline sub-content children (border color) */
  dotColor?: string;
  /** Dot indicator active/filled color */
  dotActiveColor?: string;
  /** Child item hover text color (items inside SubContent) */
  childHoverColor?: string;
  /** Child item hover background color (items inside SubContent) */
  childHoverBg?: string;
  /** Active indicator icon color (parent items — dot/bar border + fill) */
  activeIconColor?: string;
}

/** Active indicator variant for selected menu items */
export type MenuActiveIndicator = 'dot' | 'bar' | false | ReactNode;

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
  /** Default popover trigger type */
  trigger?: MenuSubTriggerType;
  /** Global floating UI settings for all popover sub-menus */
  floatingSettings?: MenuFloatingSettings;
  /** Custom color scheme — raw CSS color strings, partial fill */
  colorScheme?: MenuColorScheme;
  /**
   * Active indicator on selected items.
   * - 'dot' (default): filled dot beside selected item
   * - 'bar': vertical bar beside selected item
   * - false: disable indicator
   * - ReactNode: custom indicator element
   */
  activeIndicator?: MenuActiveIndicator;
  /** Show inline dot bullets on child items inside SubContent. Default: false */
  showDot?: boolean;
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
}

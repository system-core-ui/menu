import { useState, useCallback } from 'react';

import type { MenuSubProps } from '../models';

/**
 * MenuSub — Container for a sub-menu (popover or inline mode).
 *
 * Provides open/close state for sub-menu content.
 *
 * @example
 * ```tsx
 * <MenuSub mode="inline">
 *   <MenuSubTrigger icon={<Icon />}>Analytics</MenuSubTrigger>
 *   <MenuSubContent>
 *     <MenuItem>Overview</MenuItem>
 *   </MenuSubContent>
 * </MenuSub>
 * ```
 */
export const MenuSub = ({
  children,
  mode: _mode = 'popover',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: MenuSubProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const _isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const _setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  // TODO: provide sub-menu context to children
  return <>{children}</>;
};

MenuSub.displayName = 'MenuSub';

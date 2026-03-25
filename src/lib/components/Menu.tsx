import { useState, useCallback, useMemo } from 'react';

import type { MenuProps } from '../models';
import { MenuContext, type MenuContextValue } from '../hooks/useMenuContext';

/**
 * Menu — Root container and context provider for menu compound components.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger><button>Open</button></MenuTrigger>
 *   <MenuContent>
 *     <MenuItem>Option 1</MenuItem>
 *     <MenuItem>Option 2</MenuItem>
 *   </MenuContent>
 * </Menu>
 * ```
 */
export const Menu = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  triggerMode: _triggerMode = 'click',
}: MenuProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(() => setOpen(false), [setOpen]);

  const contextValue = useMemo<MenuContextValue>(
    () => ({
      isOpen,
      setOpen,
      close,
      dense: false,
      activeIndex: null,
      setActiveIndex: () => void 0,
      getItemProps: () => ({}),
    }),
    [isOpen, setOpen, close],
  );

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
};

Menu.displayName = 'Menu';

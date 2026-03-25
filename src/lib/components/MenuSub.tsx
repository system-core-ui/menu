import { useState, useCallback, useMemo, createContext, useContext } from 'react';

import type { MenuSubProps } from '../models';

/* ─── Sub-menu context ────────────────────────────────────── */

interface MenuSubContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const MenuSubContext = createContext<MenuSubContextValue | null>(null);

export const useMenuSubContext = (): MenuSubContextValue => {
  const context = useContext(MenuSubContext);
  if (!context) {
    throw new Error('MenuSubTrigger/MenuSubContent must be used within <MenuSub>');
  }
  return context;
};

/**
 * MenuSub — Inline collapsible sub-menu container.
 *
 * Click the trigger to expand/collapse the sub-content below it.
 *
 * @example
 * ```tsx
 * <MenuSub>
 *   <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
 *   <MenuSubContent>
 *     <MenuItem>General</MenuItem>
 *     <MenuItem>Security</MenuItem>
 *   </MenuSubContent>
 * </MenuSub>
 * ```
 */
export const MenuSub = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: MenuSubProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const toggle = useCallback(() => {
    const nextOpen = !isOpen;
    if (!isControlled) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }, [isOpen, isControlled, onOpenChange]);

  const contextValue = useMemo<MenuSubContextValue>(
    () => ({ isOpen, toggle }),
    [isOpen, toggle],
  );

  return (
    <MenuSubContext.Provider value={contextValue}>
      {children}
    </MenuSubContext.Provider>
  );
};

MenuSub.displayName = 'MenuSub';

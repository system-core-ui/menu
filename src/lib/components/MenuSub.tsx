import { useState, useCallback, useMemo, createContext, useContext } from 'react';

import type { MenuSubProps } from '../models';

/* ─── Sub-menu context ────────────────────────────────────── */

interface MenuSubContextValue {
  isOpen: boolean;
  toggle: () => void;
  /** True when any descendant MenuItem has selected={true} */
  hasSelectedChild: boolean;
  /** Called by child MenuItem when selected={true} to auto-expand this sub */
  reportSelected: () => void;
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
 * Try to get MenuSub context — returns null if not inside a MenuSub.
 * Used by MenuItem to optionally report selected state.
 */
export const useOptionalMenuSubContext = (): MenuSubContextValue | null => {
  return useContext(MenuSubContext);
};

/**
 * MenuSub — Inline collapsible sub-menu container.
 *
 * - Click the trigger to toggle expand/collapse.
 * - **Auto-expand** when any child MenuItem has `selected={true}`
 * - **Soft-select** on trigger when a descendant is selected
 *
 * @example
 * ```tsx
 * <MenuSub>
 *   <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
 *   <MenuSubContent>
 *     <MenuItem selected>General</MenuItem>
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
  const [hasSelectedChild, setHasSelectedChild] = useState(false);
  const hasAutoExpandedRef = { current: false };

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  // Bubble up to parent MenuSub
  const parentSub = useContext(MenuSubContext);

  const reportSelected = useCallback(() => {
    setHasSelectedChild(true);

    // Auto-expand this sub only once
    if (!hasAutoExpandedRef.current) {
      hasAutoExpandedRef.current = true;
      setOpen(true);
    }

    // Bubble up
    parentSub?.reportSelected();
  }, [setOpen, parentSub]);

  const contextValue = useMemo<MenuSubContextValue>(
    () => ({ isOpen, toggle, hasSelectedChild, reportSelected }),
    [isOpen, toggle, hasSelectedChild, reportSelected],
  );

  return (
    <MenuSubContext.Provider value={contextValue}>
      {children}
    </MenuSubContext.Provider>
  );
};

MenuSub.displayName = 'MenuSub';

import { useState, useCallback, useMemo, useRef, createContext, useContext } from 'react';

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
 * - Click the trigger to toggle expand/collapse.
 * - Hover to expand (with delay), leave to collapse (with delay).
 *   The delay prevents accidental close when mouse moves between
 *   trigger and content.
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
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Hover handlers with delay to prevent flicker
  const handleMouseEnter = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (!isOpen) {
      hoverTimerRef.current = setTimeout(() => setOpen(true), 150);
    }
  }, [isOpen, setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (isOpen) {
      hoverTimerRef.current = setTimeout(() => setOpen(false), 300);
    }
  }, [isOpen, setOpen]);

  const contextValue = useMemo<MenuSubContextValue>(
    () => ({ isOpen, toggle }),
    [isOpen, toggle],
  );

  return (
    <MenuSubContext.Provider value={contextValue}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </MenuSubContext.Provider>
  );
};

MenuSub.displayName = 'MenuSub';

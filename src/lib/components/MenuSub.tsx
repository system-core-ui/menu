import { useState, useCallback, useMemo, useRef, createContext, useContext } from 'react';

import type { MenuSubProps } from '../models';

/* ─── Sub-menu context ────────────────────────────────────── */

interface MenuSubContextValue {
  isOpen: boolean;
  toggle: () => void;
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
 * - Click to toggle expand/collapse
 * - Hover to expand (with delay)
 * - **Auto-expand** when any child MenuItem has `selected={true}`
 *
 * @example
 * ```tsx
 * <MenuSub>
 *   <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
 *   <MenuSubContent>
 *     <MenuItem selected>General</MenuItem>  // ← auto-expands parent
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
  const hasAutoExpandedRef = useRef(false);

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

  // If a child has selected={true}, also report to parent MenuSub (bubble up)
  const parentSub = useContext(MenuSubContext);

  const reportSelected = useCallback(() => {
    // Auto-expand this sub only once (on mount)
    if (!hasAutoExpandedRef.current) {
      hasAutoExpandedRef.current = true;
      setOpen(true);
    }
    // Bubble up: tell parent sub to expand too
    parentSub?.reportSelected();
  }, [setOpen, parentSub]);

  // Hover handlers with delay
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
    () => ({ isOpen, toggle, reportSelected }),
    [isOpen, toggle, reportSelected],
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

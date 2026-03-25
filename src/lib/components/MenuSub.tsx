import { useState, useCallback, useMemo, useRef, createContext, useContext } from 'react';

import type { MenuSubProps } from '../models';

/* ─── Sub-menu context ────────────────────────────────────── */

interface MenuSubContextValue {
  isOpen: boolean;
  toggle: () => void;
  /** True when any descendant MenuItem has selected={true} */
  hasSelectedChild: boolean;
  /** Called by child MenuItem to register/unregister selected state */
  registerSelected: () => () => void;
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
 */
export const useOptionalMenuSubContext = (): MenuSubContextValue | null => {
  return useContext(MenuSubContext);
};

/**
 * MenuSub — Inline collapsible sub-menu container.
 *
 * - Click to toggle expand/collapse
 * - **Auto-expand** when any child MenuItem has `selected={true}`
 * - **Soft-select** on trigger when a descendant is selected
 * - Clears soft-select when no descendants are selected
 */
export const MenuSub = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: MenuSubProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [selectedCount, setSelectedCount] = useState(0);
  const hasAutoExpandedRef = useRef(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const hasSelectedChild = selectedCount > 0;

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
  const parentUnregisterRef = useRef<(() => void) | null>(null);

  const registerSelected = useCallback(() => {
    setSelectedCount((c) => {
      const next = c + 1;

      // Auto-expand on first selected child
      if (next === 1 && !hasAutoExpandedRef.current) {
        hasAutoExpandedRef.current = true;
        setOpen(true);
      }

      // Bubble up: register with parent too
      if (next === 1 && parentSub) {
        parentUnregisterRef.current = parentSub.registerSelected();
      }

      return next;
    });

    // Return unregister function
    return () => {
      setSelectedCount((c) => {
        const next = c - 1;

        // Unregister from parent when no more selected children
        if (next === 0 && parentUnregisterRef.current) {
          parentUnregisterRef.current();
          parentUnregisterRef.current = null;
        }

        return next;
      });
    };
  }, [setOpen, parentSub]);

  const contextValue = useMemo<MenuSubContextValue>(
    () => ({ isOpen, toggle, hasSelectedChild, registerSelected }),
    [isOpen, toggle, hasSelectedChild, registerSelected],
  );

  return (
    <MenuSubContext.Provider value={contextValue}>
      {children}
    </MenuSubContext.Provider>
  );
};

MenuSub.displayName = 'MenuSub';

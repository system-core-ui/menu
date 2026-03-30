import { useState, useCallback, useMemo, useRef, createContext, useContext, useId } from 'react';
import { useFloatingPosition } from '@thanh-libs/dialog';
import {
  useHover,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
  FloatingContext,
} from '@floating-ui/react';

import type { MenuSubProps, MenuSubMode, MenuSubTriggerType } from '../models';
import { useMenuContext } from '../hooks/useMenuContext';
import { SUB_OPEN_DELAY, SUB_CLOSE_DELAY } from '../constants';

/* ─── Sub-menu context ────────────────────────────────────── */

interface MenuSubContextValue {
  isOpen: boolean;
  toggle: () => void;
  /** True when any descendant MenuItem has selected={true} */
  hasSelectedChild: boolean;
  /** Called by child MenuItem to register/unregister selected state */
  registerSelected: () => () => void;
  /** Unique ID for the trigger to be referenced by aria-labelledby */
  triggerId: string;

  // Resolved settings
  resolvedMode: MenuSubMode;
  resolvedTrigger: MenuSubTriggerType;

  // Popover-only fields
  setReference: ((node: HTMLElement | null) => void) | null;
  setFloating: ((node: HTMLElement | null) => void) | null;
  floatingStyles: React.CSSProperties | null;
  context: FloatingContext | null;
  getReferenceProps: ((props?: Record<string, unknown>) => Record<string, unknown>) | null;
  getFloatingProps: ((props?: Record<string, unknown>) => Record<string, unknown>) | null;
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

/* ─── MenuSubInline ───────────────────────────────────────── */

const MenuSubInline = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  resolvedMode,
  resolvedTrigger,
}: MenuSubProps & { resolvedMode: MenuSubMode; resolvedTrigger: MenuSubTriggerType }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [selectedCount, setSelectedCount] = useState(0);
  const hasAutoExpandedRef = useRef(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const hasSelectedChild = selectedCount > 0;
  const triggerId = useId();

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
    () => ({
      isOpen,
      toggle,
      hasSelectedChild,
      registerSelected,
      triggerId,
      resolvedMode,
      resolvedTrigger,
      // Inline mode does not use floating UI
      setReference: null,
      setFloating: null,
      floatingStyles: null,
      context: null,
      getReferenceProps: null,
      getFloatingProps: null,
    }),
    [isOpen, toggle, hasSelectedChild, registerSelected, triggerId, resolvedMode, resolvedTrigger],
  );

  return (
    <MenuSubContext.Provider value={contextValue}>
      {children}
    </MenuSubContext.Provider>
  );
};

/* ─── MenuSubPopover ──────────────────────────────────────── */

const MenuSubPopover = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  resolvedMode,
  resolvedTrigger,
}: MenuSubProps & { resolvedMode: MenuSubMode; resolvedTrigger: MenuSubTriggerType }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [selectedCount, setSelectedCount] = useState(0);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const hasSelectedChild = selectedCount > 0;
  const triggerId = useId();

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

      // Register with parent too
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
  }, [parentSub]);

  // Floating UI Setup
  const floating = useFloatingPosition({
    open: isOpen,
    onOpenChange: setOpen,
    placement: 'right-start', // default popover placement
    // Default offset, flip, shift are handled by useFloatingPosition
  });

  const hover = useHover(floating.context, {
    enabled: resolvedTrigger === 'hover',
    delay: { open: SUB_OPEN_DELAY, close: SUB_CLOSE_DELAY },
    handleClose: safePolygon(),
  });

  const click = useClick(floating.context, {
    enabled: resolvedTrigger === 'click',
  });

  const dismiss = useDismiss(floating.context);
  const role = useRole(floating.context, { role: 'menu' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ]);

  const contextValue = useMemo<MenuSubContextValue>(
    () => ({
      isOpen,
      toggle,
      hasSelectedChild,
      registerSelected,
      triggerId,
      resolvedMode,
      resolvedTrigger,
      setReference: floating.setReference,
      setFloating: floating.setFloating,
      floatingStyles: floating.floatingStyles,
      context: floating.context,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      isOpen,
      toggle,
      hasSelectedChild,
      registerSelected,
      triggerId,
      resolvedMode,
      resolvedTrigger,
      floating.setReference,
      floating.setFloating,
      floating.floatingStyles,
      floating.context,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return (
    <MenuSubContext.Provider value={contextValue}>
      {children}
    </MenuSubContext.Provider>
  );
};

/* ─── MenuSub ─────────────────────────────────────────────── */

/**
 * MenuSub — Container for nested sub-menus.
 *
 * Supports two modes:
 * 1. 'inline' (default) - Collapsible sub-menu inline with parent items
 * 2. 'popover' - Floating sub-menu that opens to the side
 */
export const MenuSub = ({ mode, trigger, ...props }: MenuSubProps) => {
  const { mode: parentMode, trigger: parentTrigger } = useMenuContext();
  const resolvedMode = mode ?? parentMode ?? 'inline';
  const resolvedTrigger = trigger ?? parentTrigger ?? 'hover';

  if (resolvedMode === 'popover') {
    return <MenuSubPopover resolvedMode={resolvedMode} resolvedTrigger={resolvedTrigger} {...props} />;
  }
  return <MenuSubInline resolvedMode={resolvedMode} resolvedTrigger={resolvedTrigger} {...props} />;
};

MenuSub.displayName = 'MenuSub';

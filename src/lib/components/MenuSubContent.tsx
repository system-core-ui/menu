import { forwardRef, useCallback } from 'react';
import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react';

import type { MenuSubContentProps } from '../models';
import { useMenuSubContext } from './MenuSub';
import { useMenuContext, MenuContext } from '../hooks/useMenuContext';
import { InlineSubContentStyled, PopoverSubContentStyled } from '../styled';
import { ITEM_SELECTOR } from '../helpers';

/**
 * MenuSubContent — Content container for sub-menu items.
 *
 * Supports inline sliding down, or floating popover based on resolvedMode.
 */
export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const {
      isOpen, triggerId, resolvedMode,
      setFloating, floatingStyles, getFloatingProps, context,
      setOpen,
    } = useMenuSubContext();

    const parentMenuContext = useMenuContext();
    const { colorScheme } = parentMenuContext;

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft' || e.key === 'Escape') {
          e.stopPropagation();
          e.preventDefault();
          if (isOpen) {
            setOpen(false);
          }
        }
        onKeyDown?.(e);
      },
      [isOpen, setOpen, onKeyDown]
    );

    const handlePopoverKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const items = Array.from(
          container.querySelectorAll(ITEM_SELECTOR)
        ) as HTMLElement[];

        // Even if there are no items, we might still want to handle escape/left
        const currentIndex = items.length > 0 
          ? items.indexOf(document.activeElement as HTMLElement)
          : -1;

        switch (e.key) {
          case 'ArrowDown':
            if (items.length > 0) {
              e.preventDefault();
              e.stopPropagation();
              items[(currentIndex + 1) % items.length]?.focus();
            }
            break;
          case 'ArrowUp':
            if (items.length > 0) {
              e.preventDefault();
              e.stopPropagation();
              items[(currentIndex - 1 + items.length) % items.length]?.focus();
            }
            break;
          case 'ArrowLeft':
          case 'Escape':
            e.stopPropagation();
            e.preventDefault();
            if (isOpen) {
              setOpen(false);
            }
            break;
        }
        onKeyDown?.(e);
      },
      [isOpen, setOpen, onKeyDown]
    );

    // INLINE MODE
    if (resolvedMode === 'inline') {
      return (
        <InlineSubContentStyled
          ref={ref}
          role="menu"
          aria-labelledby={triggerId}
          ownerOpen={isOpen}
          data-collapsed={!isOpen}
          ownerColorScheme={colorScheme}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {children}
        </InlineSubContentStyled>
      );
    }

    // POPOVER MODE
    if (!isOpen || !context) return null;

    return (
      <FloatingPortal>
        <MenuContext.Provider value={{ ...parentMenuContext, display: 'default' }}>
          <FloatingFocusManager context={context} modal={false}>
            <PopoverSubContentStyled
            ownerColorScheme={colorScheme}
            ref={setFloating ? (node) => {
              setFloating(node);
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            } : ref}
            role="menu"
            aria-labelledby={triggerId}
            style={floatingStyles ?? undefined}
            {...(getFloatingProps ? getFloatingProps({
              ...rest,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                handlePopoverKeyDown(e);
                onKeyDown?.(e);
              }
            }) : {
              ...rest,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                handlePopoverKeyDown(e);
                onKeyDown?.(e);
              }
            })}
          >
            {children}
          </PopoverSubContentStyled>
        </FloatingFocusManager>
        </MenuContext.Provider>
      </FloatingPortal>
    );
  },
);

MenuSubContent.displayName = 'MenuSubContent';

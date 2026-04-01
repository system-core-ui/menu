import { forwardRef, useCallback } from 'react';
import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react';

import type { MenuSubContentProps } from '../models';
import { useMenuSubContext } from './MenuSub';
import { useMenuContext, MenuContext } from '../hooks/useMenuContext';
import { PopoverSubContentStyled } from '../styled';
import { ITEM_SELECTOR, cancelEvent } from '../helpers';

import { FloatingContext, ReferenceType } from '@floating-ui/react';

// Helper component for providing MenuContext in a popover
const PopoverContextProvider = ({ 
  children, 
  context, 
}: { 
  children: React.ReactElement; 
  context: FloatingContext<ReferenceType>; 
}) => {
  const parentMenuContext = useMenuContext();
  return (
    <FloatingPortal>
      <MenuContext.Provider value={{ ...parentMenuContext, display: 'default' }}>
        <FloatingFocusManager context={context} modal={false}>
          {children}
        </FloatingFocusManager>
      </MenuContext.Provider>
    </FloatingPortal>
  );
};

export const MenuSubContentPopover = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const {
      isOpen, triggerId, setFloating, floatingStyles, getFloatingProps, context,
      setOpen,
    } = useMenuSubContext();

    const parentMenuContext = useMenuContext();
    const { colorScheme } = parentMenuContext;

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
              cancelEvent(e);
              items[(currentIndex + 1) % items.length]?.focus();
            }
            break;
          case 'ArrowUp':
            if (items.length > 0) {
              cancelEvent(e);
              items[(currentIndex - 1 + items.length) % items.length]?.focus();
            }
            break;
          case 'ArrowLeft':
          case 'Escape':
            cancelEvent(e);
            if (isOpen) {
              setOpen(false);
            }
            break;
        }
        onKeyDown?.(e);
      },
      [isOpen, setOpen, onKeyDown]
    );

    if (!isOpen || !context) return null;

    return (
      <PopoverContextProvider context={context}>
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
      </PopoverContextProvider>
    );
  }
);

MenuSubContentPopover.displayName = 'MenuSubContentPopover';

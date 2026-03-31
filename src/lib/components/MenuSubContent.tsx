import { forwardRef, useCallback } from 'react';
import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react';

import type { MenuSubContentProps } from '../models';
import { useMenuSubContext } from './MenuSub';
import { InlineSubContentStyled, PopoverSubContentStyled } from '../styled';

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
      toggle,
    } = useMenuSubContext();

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft' || e.key === 'Escape') {
          e.stopPropagation();
          e.preventDefault();
          if (isOpen) {
            toggle();
          }
        }
        onKeyDown?.(e);
      },
      [isOpen, toggle, onKeyDown]
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
        <FloatingFocusManager context={context} modal={false}>
          <PopoverSubContentStyled
            ref={setFloating ? (node) => {
              setFloating(node);
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            } : ref}
            role="menu"
            aria-labelledby={triggerId}
            style={floatingStyles ?? undefined}
            onKeyDown={handleKeyDown}
            {...(getFloatingProps ? getFloatingProps(rest) : rest)}
          >
            {children}
          </PopoverSubContentStyled>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);

MenuSubContent.displayName = 'MenuSubContent';

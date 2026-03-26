import { forwardRef, useCallback } from 'react';

import type { MenuSubContentProps } from '../models';
import { useMenuSubContext } from './MenuSub';
import { InlineSubContentStyled } from '../styled';

/**
 * MenuSubContent — Inline collapsible content for sub-menu items.
 *
 * Slides down/up with animation when parent MenuSub is toggled.
 */
export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const { isOpen, triggerId, toggle } = useMenuSubContext();

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

    return (
      <InlineSubContentStyled
        ref={ref}
        role="menu"
        aria-labelledby={triggerId}
        ownerOpen={isOpen}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </InlineSubContentStyled>
    );
  },
);

MenuSubContent.displayName = 'MenuSubContent';

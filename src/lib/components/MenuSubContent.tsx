import { forwardRef } from 'react';

import type { MenuSubContentProps } from '../models';
import { useMenuSubContext } from './MenuSub';
import { InlineSubContentStyled } from '../styled';

/**
 * MenuSubContent — Inline collapsible content for sub-menu items.
 *
 * Slides down/up with animation when parent MenuSub is toggled.
 */
export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, ...rest }, ref) => {
    const { isOpen } = useMenuSubContext();

    return (
      <InlineSubContentStyled
        ref={ref}
        role="menu"
        ownerOpen={isOpen}
        {...rest}
      >
        {children}
      </InlineSubContentStyled>
    );
  },
);

MenuSubContent.displayName = 'MenuSubContent';

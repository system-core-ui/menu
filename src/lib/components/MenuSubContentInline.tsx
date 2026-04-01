import { forwardRef, useCallback } from 'react';

import type { MenuSubContentProps } from '../models';
import { useMenuSubContext } from './MenuSub';
import { useMenuContext } from '../hooks/useMenuContext';
import { InlineSubContentStyled } from '../styled';
import { cancelEvent } from '../helpers';

export const MenuSubContentInline = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const { isOpen, triggerId, setOpen } = useMenuSubContext();
    const { colorScheme, showDot } = useMenuContext();

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft' || e.key === 'Escape') {
          cancelEvent(e);
          if (isOpen) {
            setOpen(false);
          }
        }
        onKeyDown?.(e);
      },
      [isOpen, setOpen, onKeyDown]
    );

    return (
      <InlineSubContentStyled
        ref={ref}
        role="menu"
        aria-labelledby={triggerId}
        ownerOpen={isOpen}
        ownerColorScheme={colorScheme}
        ownerShowDot={showDot}
        data-collapsed={!isOpen}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </InlineSubContentStyled>
    );
  }
);

MenuSubContentInline.displayName = 'MenuSubContentInline';

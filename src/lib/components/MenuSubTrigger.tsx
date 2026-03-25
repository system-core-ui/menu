import { forwardRef, useCallback } from 'react';

import type { MenuSubTriggerProps } from '../models';
import { useMenuContext } from '../hooks/useMenuContext';
import { useMenuSubContext } from './MenuSub';
import { MenuItemStyled, MenuItemIconStyled, MenuItemLabelStyled, SubArrowStyled } from '../styled';

/**
 * MenuSubTrigger — Item that toggles an inline sub-menu open/closed.
 *
 * Renders a trailing arrow ▾ (closed) or ▴ (open).
 */
export const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, icon, disabled = false, ...rest }, ref) => {
    const { dense } = useMenuContext();
    const { isOpen, toggle } = useMenuSubContext();

    const handleClick = useCallback(() => {
      if (disabled) return;
      toggle();
    }, [disabled, toggle]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      },
      [disabled, toggle],
    );

    return (
      <MenuItemStyled
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-disabled={disabled || undefined}
        ownerDanger={false}
        ownerDisabled={disabled}
        ownerSelected={false}
        ownerDense={dense}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {icon && <MenuItemIconStyled aria-hidden="true">{icon}</MenuItemIconStyled>}
        <MenuItemLabelStyled>{children}</MenuItemLabelStyled>
        <SubArrowStyled aria-hidden="true">{isOpen ? '▴' : '▾'}</SubArrowStyled>
      </MenuItemStyled>
    );
  },
);

MenuSubTrigger.displayName = 'MenuSubTrigger';

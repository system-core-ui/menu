import { forwardRef, useCallback } from 'react';

import type { MenuSubTriggerProps } from '../models';
import { MenuItemStyled, MenuItemIconStyled, MenuItemLabelStyled, SubArrowStyled } from '../styled';
import { useMenuContext } from '../hooks/useMenuContext';

/**
 * MenuSubTrigger — Item that opens a sub-menu.
 *
 * Renders a trailing arrow indicator (▸ for popover, ▾/▴ for inline).
 */
export const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, icon, disabled = false, ...rest }, ref) => {
    const { dense } = useMenuContext();

    const handleClick = useCallback(() => {
      if (disabled) return;
      // TODO: toggle sub-menu open state
    }, [disabled]);

    return (
      <MenuItemStyled
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="menu"
        aria-disabled={disabled || undefined}
        ownerDanger={false}
        ownerDisabled={disabled}
        ownerSelected={false}
        ownerDense={dense}
        onClick={handleClick}
        {...rest}
      >
        {icon && <MenuItemIconStyled aria-hidden="true">{icon}</MenuItemIconStyled>}
        <MenuItemLabelStyled>{children}</MenuItemLabelStyled>
        <SubArrowStyled aria-hidden="true">▸</SubArrowStyled>
      </MenuItemStyled>
    );
  },
);

MenuSubTrigger.displayName = 'MenuSubTrigger';

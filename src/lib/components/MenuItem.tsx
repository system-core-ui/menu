import { forwardRef, useCallback } from 'react';

import type { MenuItemProps } from '../models';
import { useMenuContext } from '../hooks/useMenuContext';
import {
  MenuItemStyled,
  MenuItemIconStyled,
  MenuItemLabelStyled,
  MenuItemShortcutStyled,
  MenuItemCheckStyled,
} from '../styled';

/**
 * MenuItem — Clickable action/navigation item inside a Menu.
 *
 * Supports icon, shortcut text, danger/selected/disabled variants.
 */
export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      children,
      icon,
      shortcut,
      disabled = false,
      danger = false,
      selected = false,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const { dense } = useMenuContext();

    const handleClick = useCallback(() => {
      if (disabled) return;
      onClick?.();
    }, [disabled, onClick]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      },
      [disabled, handleClick],
    );

    return (
      <MenuItemStyled
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        ownerDanger={danger}
        ownerDisabled={disabled}
        ownerSelected={selected}
        ownerDense={dense}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {selected && (
          <MenuItemCheckStyled aria-hidden="true">✓</MenuItemCheckStyled>
        )}
        {icon && <MenuItemIconStyled aria-hidden="true">{icon}</MenuItemIconStyled>}
        <MenuItemLabelStyled>{children}</MenuItemLabelStyled>
        {shortcut && <MenuItemShortcutStyled>{shortcut}</MenuItemShortcutStyled>}
      </MenuItemStyled>
    );
  },
);

MenuItem.displayName = 'MenuItem';

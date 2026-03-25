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
 * MenuItem — Clickable action item inside a Menu.
 *
 * Supports icon, shortcut text, danger/selected variants, and
 * auto-closes the menu on click by default.
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
      closeOnClick = true,
      ...rest
    },
    ref,
  ) => {
    const { close, dense } = useMenuContext();

    const handleClick = useCallback(() => {
      if (disabled) return;
      onClick?.();
      if (closeOnClick) close();
    }, [disabled, onClick, closeOnClick, close]);

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

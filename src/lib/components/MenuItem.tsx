import { forwardRef, useCallback, useEffect } from 'react';

import type { MenuItemProps } from '../models';
import { useMenuContext } from '../hooks/useMenuContext';
import { useOptionalMenuSubContext } from './MenuSub';
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
 * When `selected={true}` and inside a `MenuSub`, automatically signals
 * the parent sub-menu (and all ancestors) to expand.
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
    const subContext = useOptionalMenuSubContext();

    // Register/unregister selected state with parent MenuSub
    useEffect(() => {
      if (selected && subContext) {
        return subContext.registerSelected();
      }
      return undefined;
    }, [selected, subContext]);

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
        ownerSoftSelected={false}
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

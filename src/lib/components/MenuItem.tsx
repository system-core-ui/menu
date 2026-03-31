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
    const { dense, display, colorScheme } = useMenuContext();
    const subContext = useOptionalMenuSubContext();
    const isIconOnly = display === 'icon';

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
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        aria-current={selected ? 'page' : undefined}
        ownerDanger={danger}
        ownerDisabled={disabled}
        ownerSelected={selected}
        ownerSoftSelected={false}
        ownerDense={dense}
        ownerIconOnly={isIconOnly}
        ownerColorScheme={colorScheme}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {selected && !isIconOnly && (
          <MenuItemCheckStyled aria-hidden="true">✓</MenuItemCheckStyled>
        )}
        {icon && <MenuItemIconStyled aria-hidden="true">{icon}</MenuItemIconStyled>}
        <MenuItemLabelStyled ownerIconOnly={isIconOnly}>{children}</MenuItemLabelStyled>
        {shortcut && !isIconOnly && <MenuItemShortcutStyled ownerColorScheme={colorScheme}>{shortcut}</MenuItemShortcutStyled>}
      </MenuItemStyled>
    );
  },
);

MenuItem.displayName = 'MenuItem';

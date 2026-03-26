import { forwardRef, useCallback, useEffect, useRef } from 'react';

import type { MenuSubTriggerProps } from '../models';
import { useMenuContext } from '../hooks/useMenuContext';
import { useMenuSubContext } from './MenuSub';
import { MenuItemStyled, MenuItemIconStyled, MenuItemLabelStyled, SubArrowStyled } from '../styled';

/**
 * MenuSubTrigger — Item that toggles an inline sub-menu open/closed.
 *
 * - Renders a trailing arrow ▾ (closed) or ▴ (open).
 * - Shows a **soft-select** highlight when any descendant is selected.
 */
export const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, icon, disabled = false, onKeyDown, ...rest }, externalRef) => {
    const { dense } = useMenuContext();
    const { isOpen, toggle, hasSelectedChild, triggerId } = useMenuSubContext();

    const internalRef = useRef<HTMLDivElement>(null);
    const triggerRef = (externalRef as React.RefObject<HTMLDivElement>) || internalRef;
    const prevOpenRef = useRef(isOpen);

    useEffect(() => {
      if (prevOpenRef.current && !isOpen) {
        triggerRef.current?.focus();
      }
      prevOpenRef.current = isOpen;
    }, [isOpen, triggerRef]);

    const handleClick = useCallback(() => {
      if (disabled) return;
      toggle();
    }, [disabled, toggle]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            toggle();
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (!isOpen) toggle();
            // Focus is handled by the overall menu keyboard manager or we can force it
            // Actually, the simplest is to wait for render then focus first child.
            // We'll trust Typeahead/useMenuKeyboard or handle it directly here if needed.
            break;
          case 'ArrowDown':
            // If open, we focus the first child
            if (isOpen) {
              e.preventDefault();
              // Focus logic: not strictly handled here without a ref to the subcontent
            }
            break;
        }

        onKeyDown?.(e);
      },
      [disabled, toggle, isOpen, onKeyDown],
    );

    return (
      <MenuItemStyled
        ref={triggerRef}
        id={triggerId}
        role="menuitem"
        tabIndex={disabled ? -1 : undefined}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-disabled={disabled || undefined}
        ownerDanger={false}
        ownerDisabled={disabled}
        ownerSelected={false}
        ownerSoftSelected={hasSelectedChild}
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

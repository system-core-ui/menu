import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

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
    const { dense, display, colorScheme } = useMenuContext();
    const {
      isOpen, toggle, hasSelectedChild, triggerId,
      resolvedMode, setReference, getReferenceProps,
    } = useMenuSubContext();
    const isIconOnly = display === 'icon';

    const internalRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRefs([
      internalRef,
      externalRef,
      ...(resolvedMode === 'popover' && setReference ? [setReference] : []),
    ]);
    const prevOpenRef = useRef(isOpen);

    useEffect(() => {
      if (prevOpenRef.current && !isOpen) {
        internalRef.current?.focus();
      }
      prevOpenRef.current = isOpen;
    }, [isOpen]);

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

    const floatingReferenceProps = resolvedMode === 'popover' && getReferenceProps
      ? getReferenceProps({
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          ...rest
        })
      : {
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          ...rest
        };

    return (
      <MenuItemStyled
        ref={mergedRef}
        id={triggerId}
        role="menuitem"
        tabIndex={-1}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-disabled={disabled || undefined}
        ownerDanger={false}
        ownerDisabled={disabled}
        ownerSelected={false}
        ownerSoftSelected={hasSelectedChild}
        ownerDense={dense}
        ownerIconOnly={isIconOnly}
        ownerColorScheme={colorScheme}
        {...floatingReferenceProps}
      >
        {icon && <MenuItemIconStyled aria-hidden="true">{icon}</MenuItemIconStyled>}
        <MenuItemLabelStyled ownerIconOnly={isIconOnly}>{children}</MenuItemLabelStyled>
        {!isIconOnly && (
          <SubArrowStyled aria-hidden="true" ownerColorScheme={colorScheme}>
            {resolvedMode === 'popover' ? '▸' : isOpen ? '▴' : '▾'}
          </SubArrowStyled>
        )}
      </MenuItemStyled>
    );
  },
);

MenuSubTrigger.displayName = 'MenuSubTrigger';

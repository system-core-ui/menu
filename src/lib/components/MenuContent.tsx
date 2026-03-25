import { forwardRef } from 'react';

import { FloatingPortal } from '@floating-ui/react';

import type { MenuContentProps } from '../models';
import { useMenuContext } from '../hooks/useMenuContext';
import { MenuContentStyled } from '../styled';
import { normalizeMaxHeight, normalizeMinWidth } from '../helpers';
import {
  DEFAULT_MAX_HEIGHT,
  DEFAULT_MIN_WIDTH,
  DEFAULT_Z_INDEX,
} from '../constants';

/**
 * MenuContent — Floating panel that contains menu items.
 *
 * Rendered inside a portal when menu is open. Provides `role="menu"`
 * and keyboard navigation.
 */
export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  (
    {
      children,
      placement: _placement = 'bottom-start',
      offset: _offset = 4,
      maxHeight = DEFAULT_MAX_HEIGHT,
      minWidth = DEFAULT_MIN_WIDTH,
      dense = false,
      zIndex = DEFAULT_Z_INDEX,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const { isOpen } = useMenuContext();

    if (!isOpen) return null;

    return (
      <FloatingPortal>
        <MenuContentStyled
          ref={ref}
          role="menu"
          ownerDense={dense}
          ownerMaxHeight={normalizeMaxHeight(maxHeight)}
          ownerMinWidth={normalizeMinWidth(minWidth)}
          className={className}
          style={{ zIndex, ...style }}
          {...rest}
        >
          {children}
        </MenuContentStyled>
      </FloatingPortal>
    );
  },
);

MenuContent.displayName = 'MenuContent';

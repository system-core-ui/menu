import { forwardRef } from 'react';
import type { MenuSubContentProps } from '../models';
import { useMenuSubContext } from './MenuSub';
import { MenuSubContentInline } from './MenuSubContentInline';
import { MenuSubContentPopover } from './MenuSubContentPopover';

/**
 * MenuSubContent — Content container for sub-menu items.
 *
 * Supports inline sliding down, or floating popover based on resolvedMode.
 */
export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  (props, ref) => {
    const { resolvedMode } = useMenuSubContext();

    if (resolvedMode === 'inline') {
      return <MenuSubContentInline ref={ref} {...props} />;
    }

    return <MenuSubContentPopover ref={ref} {...props} />;
  }
);

MenuSubContent.displayName = 'MenuSubContent';


import { forwardRef } from 'react';

import type { MenuSubContentProps } from '../models';

/**
 * MenuSubContent — Content panel for sub-menu items.
 *
 * Renders as floating popover or inline collapse depending on parent MenuSub mode.
 */
export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  (
    {
      children,
      placement: _placement = 'right-start',
      offset: _offset = 0,
      ...rest
    },
    ref,
  ) => {
    // TODO: implement popover vs inline rendering based on MenuSub mode context
    return (
      <div ref={ref} role="menu" {...rest}>
        {children}
      </div>
    );
  },
);

MenuSubContent.displayName = 'MenuSubContent';

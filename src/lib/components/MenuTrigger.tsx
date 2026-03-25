import { cloneElement, type ReactElement } from 'react';

import type { MenuTriggerProps } from '../models';
import { useMenuContext } from '../hooks/useMenuContext';

/**
 * MenuTrigger — Element that opens the menu on click.
 *
 * Must be used inside `<Menu>`. Clones the child element and attaches
 * click handler + ARIA attributes.
 */
export const MenuTrigger = ({ children }: MenuTriggerProps) => {
  const { isOpen, setOpen } = useMenuContext();

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    onClick: handleClick,
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
  });
};

MenuTrigger.displayName = 'MenuTrigger';

import type { MenuDividerProps } from '../models';
import { MenuDividerStyled } from '../styled';

/**
 * MenuDivider — Visual separator between menu items.
 */
export const MenuDivider = ({ className, style }: MenuDividerProps) => (
  <MenuDividerStyled role="separator" className={className} style={style} />
);

MenuDivider.displayName = 'MenuDivider';

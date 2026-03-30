import type { MenuDividerProps } from '../models';
import { MenuDividerStyled } from '../styled';

/**
 * MenuDivider — Visual separator between menu items.
 */
export const MenuDivider = ({ className, style, ...rest }: MenuDividerProps) => (
  <MenuDividerStyled role="separator" className={className} style={style} {...rest} />
);

MenuDivider.displayName = 'MenuDivider';

import type { MenuLabelProps } from '../models';
import { MenuLabelStyled } from '../styled';

/**
 * MenuLabel — Non-interactive group header text.
 */
export const MenuLabel = ({ children, className, style, id }: MenuLabelProps) => (
  <MenuLabelStyled role="none" className={className} style={style} id={id}>
    {children}
  </MenuLabelStyled>
);

MenuLabel.displayName = 'MenuLabel';

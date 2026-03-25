import type { MenuLabelProps } from '../models';
import { MenuLabelStyled } from '../styled';

/**
 * MenuLabel — Non-interactive group header text.
 */
export const MenuLabel = ({ children, className, style }: MenuLabelProps) => (
  <MenuLabelStyled role="none" className={className} style={style}>
    {children}
  </MenuLabelStyled>
);

MenuLabel.displayName = 'MenuLabel';

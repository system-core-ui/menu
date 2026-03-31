import type { MenuLabelProps } from '../models';
import { MenuLabelStyled } from '../styled';
import { useMenuContext } from '../hooks/useMenuContext';

/**
 * MenuLabel — Non-interactive group header text.
 */
export const MenuLabel = ({ children, className, style, id }: MenuLabelProps) => {
  const { colorScheme } = useMenuContext();

  return (
    <MenuLabelStyled role="none" className={className} style={style} id={id} ownerColorScheme={colorScheme}>
      {children}
    </MenuLabelStyled>
  );
};

MenuLabel.displayName = 'MenuLabel';

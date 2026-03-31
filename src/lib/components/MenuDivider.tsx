import type { MenuDividerProps } from '../models';
import { MenuDividerStyled } from '../styled';
import { useMenuContext } from '../hooks/useMenuContext';

/**
 * MenuDivider — Visual separator between menu items.
 */
export const MenuDivider = ({ className, style, ...rest }: MenuDividerProps) => {
  const { colorScheme } = useMenuContext();

  return (
    <MenuDividerStyled role="separator" className={className} style={style} ownerColorScheme={colorScheme} {...rest} />
  );
};

MenuDivider.displayName = 'MenuDivider';

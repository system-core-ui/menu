import { forwardRef, useMemo } from 'react';

import type { MenuProps } from '../models';
import { MenuContext, type MenuContextValue } from '../hooks/useMenuContext';
import { MenuContainerStyled } from '../styled';

/**
 * Menu — Persistent visible list of navigation/action items.
 *
 * Always rendered (not a dropdown). Supports inline collapsible sub-menus,
 * icons, labels, dividers, groups, and selected/disabled states.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuItem icon={<HomeIcon />}>Home</MenuItem>
 *   <MenuItem icon={<UsersIcon />} selected>Users</MenuItem>
 *   <MenuSub>
 *     <MenuSubTrigger icon={<SettingsIcon />}>Settings</MenuSubTrigger>
 *     <MenuSubContent>
 *       <MenuItem>General</MenuItem>
 *       <MenuItem>Security</MenuItem>
 *     </MenuSubContent>
 *   </MenuSub>
 * </Menu>
 * ```
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, dense = false, className, style, ...rest }, ref) => {
    const contextValue = useMemo<MenuContextValue>(
      () => ({ dense }),
      [dense],
    );

    return (
      <MenuContext.Provider value={contextValue}>
        <MenuContainerStyled
          ref={ref}
          role="menu"
          className={className}
          style={style}
          {...rest}
        >
          {children}
        </MenuContainerStyled>
      </MenuContext.Provider>
    );
  },
);

Menu.displayName = 'Menu';

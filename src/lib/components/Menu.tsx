import { forwardRef, useMemo, useRef, useCallback } from 'react';

import type { MenuProps } from '../models';
import { MenuContext, type MenuContextValue } from '../hooks/useMenuContext';
import { useMenuKeyboard } from '../hooks/useMenuKeyboard';
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
  ({ children, dense = false, maxHeight, className, style, onKeyDown, ...rest }, externalRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const containerRef = (externalRef as React.RefObject<HTMLDivElement>) || internalRef;
    
    const { onKeyDown: handleKeyboard } = useMenuKeyboard(containerRef);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        handleKeyboard(e);
        onKeyDown?.(e);
      },
      [handleKeyboard, onKeyDown]
    );

    const contextValue = useMemo<MenuContextValue>(
      () => ({ dense }),
      [dense],
    );

    return (
      <MenuContext.Provider value={contextValue}>
        <MenuContainerStyled
          ref={containerRef}
          role="menu"
          tabIndex={0}
          className={className}
          style={style}
          ownerMaxHeight={maxHeight}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {children}
        </MenuContainerStyled>
      </MenuContext.Provider>
    );
  },
);

Menu.displayName = 'Menu';

import { forwardRef, useMemo, useRef, useCallback } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { MenuProps } from '../models';
import { MenuContext, type MenuContextValue } from '../hooks/useMenuContext';
import { useMenuKeyboard } from '../hooks/useMenuKeyboard';
import { MenuContainerStyled } from '../styled';

/**
 * Menu — Persistent visible list of navigation/action items.
 *
 * Always rendered — persistent visible list. Supports inline collapsible sub-menus,
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
  ({ children, dense = false, mode = 'inline', display = 'default', trigger = 'hover', floatingSettings, colorScheme, activeIndicator = 'dot', showDot = false, maxHeight, className, style, onKeyDown, ...rest }, externalRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRefs([internalRef, externalRef]);
    
    const { onKeyDown: handleKeyboard } = useMenuKeyboard(internalRef as React.RefObject<HTMLDivElement>);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        handleKeyboard(e);
        onKeyDown?.(e);
      },
      [handleKeyboard, onKeyDown]
    );

    const contextValue = useMemo<MenuContextValue>(
      () => ({ dense, mode, display, trigger, floatingSettings, colorScheme, activeIndicator, showDot }),
      [dense, mode, display, trigger, floatingSettings, colorScheme, activeIndicator, showDot],
    );

    return (
      <MenuContext.Provider value={contextValue}>
        <MenuContainerStyled
          ref={mergedRef}
          role="menu"
          tabIndex={0}
          className={className}
          style={style}
          ownerMaxHeight={maxHeight}
          ownerColorScheme={colorScheme}
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

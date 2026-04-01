import { createContext, useContext } from 'react';

import type { MenuSubMode, MenuDisplay, MenuSubTriggerType, MenuFloatingSettings, MenuColorScheme, MenuActiveIndicator } from '../models';

export interface MenuContextValue {
  /** Whether this is a dense menu */
  dense: boolean;
  /** Default sub-menu mode */
  mode: MenuSubMode;
  /** Icon-only mode */
  display: MenuDisplay;
  /** Default popover trigger type */
  trigger: MenuSubTriggerType;
  /** Global floating UI settings for all popover sub-menus */
  floatingSettings?: MenuFloatingSettings;
  colorScheme?: MenuColorScheme;
  /** Active indicator configuration */
  activeIndicator?: MenuActiveIndicator;
  /** Show inline dot for SubContent children */
  showDot?: boolean;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export const useMenuContext = (): MenuContextValue => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu compound components must be used within <Menu>');
  }
  return context;
};

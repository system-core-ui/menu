import { createContext, useContext } from 'react';

export interface MenuContextValue {
  /** Whether this is a dense menu */
  dense: boolean;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export const useMenuContext = (): MenuContextValue => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu compound components must be used within <Menu>');
  }
  return context;
};

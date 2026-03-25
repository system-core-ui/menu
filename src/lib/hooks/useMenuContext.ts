import { createContext, useContext } from 'react';

export interface MenuContextValue {
  /** Whether the menu is open */
  isOpen: boolean;
  /** Open/close handler */
  setOpen: (open: boolean) => void;
  /** Close the menu */
  close: () => void;
  /** Whether this is a dense menu */
  dense: boolean;
  /** Active (focused) item index for keyboard navigation */
  activeIndex: number | null;
  /** Set active item index */
  setActiveIndex: (index: number | null) => void;
  /** Ref list for roving tabindex */
  getItemProps: (index: number) => Record<string, unknown>;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export const useMenuContext = (): MenuContextValue => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu compound components must be used within <Menu>');
  }
  return context;
};

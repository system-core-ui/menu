import type { MenuGroupProps } from '../models';
import { MenuLabel } from './MenuLabel';

/**
 * MenuGroup — Semantic grouping of menu items with optional label.
 */
export const MenuGroup = ({ children, label, className }: MenuGroupProps) => (
  <div role="group" className={className}>
    {label && <MenuLabel>{label}</MenuLabel>}
    {children}
  </div>
);

MenuGroup.displayName = 'MenuGroup';

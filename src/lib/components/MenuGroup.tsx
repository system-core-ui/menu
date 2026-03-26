import { useId } from 'react';
import type { MenuGroupProps } from '../models';
import { MenuLabel } from './MenuLabel';

/**
 * MenuGroup — Semantic grouping of menu items with optional label.
 */
export const MenuGroup = ({ children, label, className }: MenuGroupProps) => {
  const labelId = useId();

  return (
    <div role="group" className={className} aria-labelledby={label ? labelId : undefined}>
      {label && <MenuLabel id={labelId}>{label}</MenuLabel>}
      {children}
    </div>
  );
};

MenuGroup.displayName = 'MenuGroup';

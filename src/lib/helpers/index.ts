export const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';

/**
 * Returns all visible (non-collapsed) menu items within a container.
 * Filters out items inside a collapsed sub-menu ([data-collapsed="true"]).
 */
export const getVisibleMenuItems = (container: HTMLElement): HTMLElement[] => {
  const all = Array.from(
    container.querySelectorAll(ITEM_SELECTOR)
  ) as HTMLElement[];
  return all.filter(
    (el) => el.closest('[role="menu"][data-collapsed="true"]') === null
  );
};

/**
 * Resolve text color for a menu item based on danger/disabled state.
 * Falls back to palette.text.primary when neither danger nor disabled.
 */
export const getTextColor = (
  danger: boolean,
  disabled: boolean,
  palette: {
    error: { main: string };
    text: { disabled: string; primary: string };
  }
): string => {
  if (danger) return palette.error.main;
  if (disabled) return palette.text.disabled;
  return palette.text.primary;
};

/**
 * Stop event propagation and prevent default action.
 */
export const cancelEvent = (e: React.SyntheticEvent | Event) => {
  e.stopPropagation();
  e.preventDefault();
};

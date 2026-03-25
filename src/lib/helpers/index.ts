/**
 * Normalize maxHeight to a CSS-valid string.
 */
export const normalizeMaxHeight = (value: number | string): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

/**
 * Normalize minWidth to a CSS-valid string.
 */
export const normalizeMinWidth = (value: number | string): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

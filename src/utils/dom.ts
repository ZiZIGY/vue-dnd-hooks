import type { IPoint } from '../types';

export const isDescendant = (
  element: HTMLElement | null,
  container: HTMLElement
): boolean => {
  if (!element) return false;
  if (element === container) return true;
  return container.contains(element);
};

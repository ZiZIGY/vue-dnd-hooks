import type { IPoint } from '../types';

export const autoScroll = (
  container: HTMLElement,
  point: IPoint,
  threshold = 50,
  speed = 10
) => {
  const rect = container.getBoundingClientRect();
  const scrollTop = container.scrollTop;
  const scrollLeft = container.scrollLeft;

  if (point.y - rect.top < threshold) {
    container.scrollTop = scrollTop - speed;
  }
  if (rect.bottom - point.y < threshold) {
    container.scrollTop = scrollTop + speed;
  }
  if (point.x - rect.left < threshold) {
    container.scrollLeft = scrollLeft - speed;
  }
  if (rect.right - point.x < threshold) {
    container.scrollLeft = scrollLeft + speed;
  }
};

export const isDescendant = (
  element: HTMLElement | null,
  container: HTMLElement
): boolean => {
  if (!element) return false;
  if (element === container) return true;
  return container.contains(element);
};

import type { IPoint } from "../types";

export const isDescendant = (
  element: HTMLElement | null,
  container: HTMLElement
): boolean => {
  if (!element) return false;
  if (element === container) return true;
  return container.contains(element);
};

export const findElementFromPoints = (points: IPoint[]): Element | null => {
  const iterations = Math.ceil(points.length / 2);

  for (let i = 0; i < iterations; i++) {
    // Проверяем точку с начала
    const elementFromStart = document.elementFromPoint(
      points[i].x,
      points[i].y
    );
    if (elementFromStart) return elementFromStart;

    // Проверяем точку с конца
    const endIndex = points.length - 1 - i;
    if (endIndex !== i) {
      // Избегаем повторной проверки одной точки
      const elementFromEnd = document.elementFromPoint(
        points[endIndex].x,
        points[endIndex].y
      );
      if (elementFromEnd) return elementFromEnd;
    }
  }

  return null;
};

import type { IBoundingBox, IPoint } from '../types';

export const checkCollision = (
  firstBox: IBoundingBox,
  secondBox: IBoundingBox
): boolean => {
  return (
    firstBox.x < secondBox.x + secondBox.width &&
    firstBox.x + firstBox.width > secondBox.x &&
    firstBox.y < secondBox.y + secondBox.height &&
    firstBox.y + firstBox.height > secondBox.y
  );
};

export const getBoundingBox = (element: HTMLElement | null): IBoundingBox => {
  if (!element) return { x: 0, y: 0, width: 0, height: 0 };

  const { x, y, width, height } = element.getBoundingClientRect();
  return { x, y, width, height };
};

export const getCenter = (box: IBoundingBox): IPoint => ({
  x: box.x + box.width / 2,
  y: box.y + box.height / 2,
});

export const getOffset = (
  element: HTMLElement | null,
  pointer: IPoint
): IPoint => {
  const rect = getBoundingBox(element);
  return { x: pointer.x - rect.y, y: pointer.y - rect.x };
};

export const getDelta = (firstPoint: IPoint, secondPoint: IPoint): IPoint => ({
  x: secondPoint.x - firstPoint.x,
  y: secondPoint.y - firstPoint.y,
});

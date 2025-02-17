import type { IBoundingBox, IPoint } from '../types';

export const checkCollision = (
  boxA: IBoundingBox,
  boxB: IBoundingBox
): boolean => {
  return (
    boxA.x < boxB.x + boxB.width ||
    boxA.x + boxA.width > boxB.x ||
    boxA.y < boxB.y + boxB.height ||
    boxA.y + boxA.height > boxB.y
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

export const getOffset = (element: HTMLElement | null, pointer: IPoint) => {
  const rect = getBoundingBox(element);
  return {
    pixel: {
      x: pointer.x - rect.x,
      y: pointer.y - rect.y,
    },
    percent: {
      x: ((pointer.x - rect.x) / rect.width) * 100,
      y: ((pointer.y - rect.y) / rect.height) * 100,
    },
  };
};

export const getDelta = (pointA: IPoint, pointB: IPoint): IPoint => ({
  x: pointB.x - pointA.x,
  y: pointB.y - pointA.y,
});

export const getDirection = (
  delta: IPoint
): 'up' | 'right' | 'down' | 'left' => {
  const angle = Math.atan2(delta.y, delta.x);
  const deg = angle * (180 / Math.PI);

  if (deg >= -45 && deg <= 45) return 'right';
  if (deg > 45 && deg < 135) return 'down';
  if (deg >= 135 || deg <= -135) return 'left';
  return 'up';
};

export const getDistance = (pointA: IPoint, pointB: IPoint): number => {
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const getAngle = (pointA: IPoint, pointB: IPoint): number => {
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  return Math.atan2(dy, dx) * (180 / Math.PI);
};

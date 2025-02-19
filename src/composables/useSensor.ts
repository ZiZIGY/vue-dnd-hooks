import type {
  IBoundingBox,
  IDragElement,
  IDraggingElement,
  IDropZone,
} from '../types';
import {
  checkCollision,
  getBoundingBox,
  getCenter,
  getDistance,
} from '../utils/geometry';
import { draggableDataName, droppableDataName } from '../utils/namespaces';

import type { Ref } from 'vue';
import { isDescendant } from '../utils/dom';
import { useDnDStore } from './useDnDStore';
import { usePointer } from './usePointer';

export const useSensor = (elementRef: Ref<HTMLElement | null>) => {
  const {
    draggingElements,
    selectedElements,
    elements,
    activeContainer,
    zones,
    hovered,
    pointerPosition,
  } = useDnDStore();
  const { onPointerStart, onPointerMove, onPointerEnd } =
    usePointer(elementRef);

  let animationFrameId: number | null = null;

  const getDraggingElements = (
    draggableElement: HTMLElement | null
  ): IDraggingElement[] => {
    if (selectedElements.value.length) {
      return selectedElements.value.map((element) => ({
        ...element,
        initialHTML: element.node?.outerHTML ?? '',
        initialRect: element.node?.getBoundingClientRect(),
      }));
    }

    const element = elements.value.find(
      (element) => element.node === draggableElement
    );
    if (!element) return [];

    return [
      {
        ...element,
        initialHTML: element.node?.outerHTML ?? '',
        initialRect: element.node?.getBoundingClientRect(),
      },
    ];
  };

  const getOverlapPercent = (
    boxA: IBoundingBox,
    boxB: IBoundingBox
  ): number => {
    const xOverlap = Math.max(
      0,
      Math.min(boxA.x + boxA.width, boxB.x + boxB.width) -
        Math.max(boxA.x, boxB.x)
    );
    const yOverlap = Math.max(
      0,
      Math.min(boxA.y + boxA.height, boxB.y + boxB.height) -
        Math.max(boxA.y, boxB.y)
    );

    const overlapArea = xOverlap * yOverlap;
    const boxAArea = boxA.width * boxA.height;

    return (overlapArea / boxAArea) * 100;
  };

  const detectCollisions = () => {
    const containerCenter = getCenter(
      getBoundingBox(activeContainer.ref.value)
    );
    const pointerX = pointerPosition.current.value?.x ?? 0;
    const pointerY = pointerPosition.current.value?.y ?? 0;
    const containerRect = getBoundingBox(activeContainer.ref.value);

    // Получаем все активные перетаскиваемые элементы
    const activeDragNodes = draggingElements.value.map((el) => el.node);

    // Сначала проверяем элементы
    const collidingElements = elements.value
      .filter((element) => {
        if (
          !element.node ||
          activeDragNodes.some(
            (dragNode) =>
              dragNode &&
              isDescendant(element.node as HTMLElement, dragNode as HTMLElement)
          )
        ) {
          return false;
        }

        const rect = getBoundingBox(element.node as HTMLElement);
        return rect && containerRect && checkCollision(rect, containerRect);
      })
      .map((element) => {
        const rect = getBoundingBox(element.node as HTMLElement);
        const elementCenter = getCenter(rect);
        const distance = getDistance(containerCenter, elementCenter);

        const isPointerOver =
          pointerX >= rect.x &&
          pointerX <= rect.x + rect.width &&
          pointerY >= rect.y &&
          pointerY <= rect.y + rect.height;

        const overlapPercent = getOverlapPercent(containerRect, rect);

        return {
          element,
          distance,
          isPointerOver,
          overlapPercent,
        };
      })
      .sort((a, b) => {
        // Приоритет 1: Указатель находится над элементом
        if (a.isPointerOver !== b.isPointerOver) {
          return a.isPointerOver ? -1 : 1;
        }
        // Приоритет 2: Процент перекрытия
        if (Math.abs(a.overlapPercent - b.overlapPercent) > 1) {
          return b.overlapPercent - a.overlapPercent;
        }
        // Приоритет 3: Расстояние до центра
        return a.distance - b.distance;
      });

    // Аналогично для зон
    const collidingZones = zones.value
      .filter((zone) => {
        if (
          !zone.node ||
          activeDragNodes.some(
            (dragNode) =>
              dragNode &&
              isDescendant(zone.node as HTMLElement, dragNode as HTMLElement)
          )
        ) {
          return false;
        }

        const rect = getBoundingBox(zone.node as HTMLElement);
        return rect && containerRect && checkCollision(rect, containerRect);
      })
      .map((zone) => {
        const rect = getBoundingBox(zone.node as HTMLElement);
        const zoneCenter = getCenter(rect);
        const distance = getDistance(containerCenter, zoneCenter);

        const isPointerOver =
          pointerX >= rect.x &&
          pointerX <= rect.x + rect.width &&
          pointerY >= rect.y &&
          pointerY <= rect.y + rect.height;

        const overlapPercent = getOverlapPercent(containerRect, rect);

        return {
          zone,
          distance,
          isPointerOver,
          overlapPercent,
        };
      })
      .sort((a, b) => {
        if (a.isPointerOver !== b.isPointerOver) {
          return a.isPointerOver ? -1 : 1;
        }
        if (Math.abs(a.overlapPercent - b.overlapPercent) > 1) {
          return b.overlapPercent - a.overlapPercent;
        }
        return a.distance - b.distance;
      });

    hovered.element.value = collidingElements[0]?.element ?? null;
    hovered.zone.value = collidingZones[0]?.zone ?? null;

    animationFrameId = requestAnimationFrame(detectCollisions);
  };

  const startDetection = () => {
    detectCollisions();
  };

  const stopDetection = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const activate = (event: PointerEvent) => {
    draggingElements.value = getDraggingElements(elementRef.value);
    onPointerStart(event);

    startDetection();
  };

  const track = (event: PointerEvent | WheelEvent) => {
    onPointerMove(event);
  };

  const deactivate = () => {
    onPointerEnd();

    draggingElements.value = [];
    hovered.zone.value = null;

    stopDetection();
  };

  return {
    activate,
    track,
    deactivate,
  };
};

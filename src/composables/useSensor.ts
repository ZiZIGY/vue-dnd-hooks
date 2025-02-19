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
    const boxBArea = boxB.width * boxB.height;
    const smallerArea = Math.min(boxAArea, boxBArea);

    return (overlapArea / smallerArea) * 100;
  };

  const detectCollisions = () => {
    const containerRect = getBoundingBox(activeContainer.ref.value);
    const pointerX = pointerPosition.current.value?.x ?? 0;
    const pointerY = pointerPosition.current.value?.y ?? 0;

    // Проверяем, находится ли указатель внутри активного контейнера
    const isPointerInActiveContainer =
      containerRect &&
      pointerX >= containerRect.x &&
      pointerX <= containerRect.x + containerRect.width &&
      pointerY >= containerRect.y &&
      pointerY <= containerRect.y + containerRect.height;

    // Если курсор не в активном контейнере, используем обычную логику
    const shouldUseNormalPriority = !isPointerInActiveContainer;

    const activeDragNodes = draggingElements.value.map((el) => el.node);

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

        const isPointerInElement =
          pointerX >= rect.x &&
          pointerX <= rect.x + rect.width &&
          pointerY >= rect.y &&
          pointerY <= rect.y + rect.height;

        const overlapPercent = getOverlapPercent(rect, containerRect);

        return {
          zone,
          isPointerInElement,
          isPointerInActiveContainer,
          overlapPercent,
          area: rect.width * rect.height,
        };
      })
      .sort((a, b) => {
        // Если курсор в активном контейнере, используем только isPointerInElement
        if (!shouldUseNormalPriority) {
          if (a.isPointerInElement !== b.isPointerInElement) {
            return a.isPointerInElement ? -1 : 1;
          }
          return 0;
        }

        // Иначе используем обычную логику приоритетов
        if (Math.abs(a.overlapPercent - b.overlapPercent) > 1) {
          return b.overlapPercent - a.overlapPercent;
        }
        return a.area - b.area;
      });

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

        const isPointerInElement =
          pointerX >= rect.x &&
          pointerX <= rect.x + rect.width &&
          pointerY >= rect.y &&
          pointerY <= rect.y + rect.height;

        const overlapPercent = getOverlapPercent(rect, containerRect);

        return {
          element,
          isPointerInElement,
          overlapPercent,
          area: rect.width * rect.height,
        };
      })
      .sort((a, b) => {
        if (!shouldUseNormalPriority) {
          if (a.isPointerInElement !== b.isPointerInElement) {
            return a.isPointerInElement ? -1 : 1;
          }
          return 0;
        }

        if (Math.abs(a.overlapPercent - b.overlapPercent) > 1) {
          return b.overlapPercent - a.overlapPercent;
        }
        return a.area - b.area;
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

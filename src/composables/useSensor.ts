import { draggableDataName, droppableDataName } from '../utils/namespaces';
import { getBoundingBox, getCenter, getDistance } from '../utils/geometry';

import type { IDraggingElement } from '../types';
import type { Ref } from 'vue';
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

  const findNearestElements = (): {
    dropZone: HTMLElement | null;
    draggableItem: HTMLElement | null;
  } => {
    if (!activeContainer.ref.value || !pointerPosition.current.value)
      return { dropZone: null, draggableItem: null };

    const container = activeContainer.ref.value;
    const containerBox = container.getBoundingClientRect();
    const containerCenter = getCenter(containerBox);

    // Проверяем, находится ли указатель мыши внутри контейнера
    const isPointerInsideContainer =
      pointerPosition.current.value.x >= containerBox.left &&
      pointerPosition.current.value.x <= containerBox.right &&
      pointerPosition.current.value.y >= containerBox.top &&
      pointerPosition.current.value.y <= containerBox.bottom;

    const topPoints = [
      { x: containerBox.x, y: containerBox.y },
      { x: containerBox.x + containerBox.width * 0.5, y: containerBox.y },
      { x: containerBox.x + containerBox.width, y: containerBox.y },
    ];

    const centerPoints = [
      { x: containerBox.x, y: containerBox.y + containerBox.height * 0.5 },
      { x: containerCenter.x, y: containerCenter.y },
      {
        x: containerBox.x + containerBox.width,
        y: containerBox.y + containerBox.height * 0.5,
      },
    ];

    const bottomPoints = [
      { x: containerBox.x, y: containerBox.y + containerBox.height },
      {
        x: containerBox.x + containerBox.width * 0.5,
        y: containerBox.y + containerBox.height,
      },
      {
        x: containerBox.x + containerBox.width,
        y: containerBox.y + containerBox.height,
      },
    ];

    const findElementsForPoints = (points: Array<{ x: number; y: number }>) => {
      const dropZones = new Set<HTMLElement>();
      const draggableItems = new Set<HTMLElement>();

      // Если указатель внутри контейнера, сначала проверяем точку указателя
      if (isPointerInsideContainer && pointerPosition.current.value) {
        const elements = document.elementsFromPoint(
          pointerPosition.current.value.x,
          pointerPosition.current.value.y
        );
        elements.forEach((element) => {
          if (!(element instanceof HTMLElement)) return;

          const isValidElement =
            !container.contains(element) &&
            element !== container &&
            !draggingElements.value.some(
              (dragEl) =>
                dragEl.node?.contains(element) || element === dragEl.node
            );

          if (!isValidElement) return;

          if (element.hasAttribute(droppableDataName)) {
            dropZones.add(element);
          }
          if (element.hasAttribute(draggableDataName)) {
            draggableItems.add(element);
          }
        });
      }

      // Затем проверяем все остальные точки
      points.forEach((point) => {
        const elements = document.elementsFromPoint(point.x, point.y);
        elements.forEach((element) => {
          if (!(element instanceof HTMLElement)) return;

          const isValidElement =
            !container.contains(element) &&
            element !== container &&
            !draggingElements.value.some(
              (dragEl) =>
                dragEl.node?.contains(element) || element === dragEl.node
            );

          if (!isValidElement) return;

          if (element.hasAttribute(droppableDataName)) {
            dropZones.add(element);
          }
          if (element.hasAttribute(draggableDataName)) {
            draggableItems.add(element);
          }
        });
      });

      return { dropZones, draggableItems };
    };

    // Проверяем точки в порядке приоритета
    let { dropZones, draggableItems } = findElementsForPoints(topPoints);

    // Если не нашли в верхних точках, проверяем центральные
    if (dropZones.size === 0) {
      const centerElements = findElementsForPoints(centerPoints);
      dropZones = centerElements.dropZones;
    }
    if (draggableItems.size === 0) {
      const centerElements = findElementsForPoints(centerPoints);
      draggableItems = centerElements.draggableItems;
    }

    // Если все еще не нашли, проверяем нижние точки
    if (dropZones.size === 0) {
      const bottomElements = findElementsForPoints(bottomPoints);
      dropZones = bottomElements.dropZones;
    }
    if (draggableItems.size === 0) {
      const bottomElements = findElementsForPoints(bottomPoints);
      draggableItems = bottomElements.draggableItems;
    }

    const findNearest = (elements: Set<HTMLElement>): HTMLElement | null => {
      if (elements.size === 0) return null;

      return Array.from(elements).reduce((nearest, current) => {
        if (!nearest) return current;

        const nearestBox = getBoundingBox(nearest);
        const currentBox = getBoundingBox(current);

        const nearestCenter = getCenter(nearestBox);
        const currentCenter = getCenter(currentBox);

        const nearestDistance = getDistance(containerCenter, nearestCenter);
        const currentDistance = getDistance(containerCenter, currentCenter);

        return currentDistance < nearestDistance ? current : nearest;
      }, null as HTMLElement | null);
    };

    return {
      dropZone: findNearest(dropZones),
      draggableItem: findNearest(draggableItems),
    };
  };

  const findAndSetHoveredZone = (dropZone: HTMLElement | null) => {
    if (!dropZone) {
      hovered.zone.value = null;
      return;
    }

    // Ищем зону в zones по node
    const zone = zones.value.find((zone) => zone.node === dropZone);

    if (zone) {
      hovered.zone.value = zone;
    } else {
      hovered.zone.value = null;
    }
  };

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

    return element
      ? [
          {
            ...element,
            initialHTML: element.node?.outerHTML ?? '',
            initialRect: element.node?.getBoundingClientRect(),
          },
        ]
      : [];
  };

  const updateDropZone = () => {
    const { dropZone, draggableItem } = findNearestElements();

    if (dropZone !== hovered.zone.value?.node) {
      findAndSetHoveredZone(dropZone);
    }

    if (draggableItem !== hovered.element.value?.node) {
      const element = elements.value.find((el) => el.node === draggableItem);
      hovered.element.value = element || null;
    }

    animationFrameId = requestAnimationFrame(updateDropZone);
  };

  const activate = (event: PointerEvent) => {
    draggingElements.value = getDraggingElements(elementRef.value);
    onPointerStart(event);
    animationFrameId = requestAnimationFrame(updateDropZone);
  };

  const track = (event: PointerEvent | WheelEvent) => {
    onPointerMove(event);
  };

  const deactivate = () => {
    onPointerEnd();
    draggingElements.value = [];
    hovered.zone.value = null;
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  return {
    activate,
    track,
    deactivate,
  };
};

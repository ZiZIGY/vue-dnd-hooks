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

  const findNearestDropZone = (): HTMLElement | null => {
    if (!activeContainer.ref.value || !pointerPosition.current.value)
      return null;

    const container = activeContainer.ref.value;
    const containerBox = container.getBoundingClientRect();
    const containerCenter = getCenter(containerBox);

    const isPointerInsideElement =
      pointerPosition.current.value.x >= containerBox.left &&
      pointerPosition.current.value.x <= containerBox.right &&
      pointerPosition.current.value.y >= containerBox.top &&
      pointerPosition.current.value.y <= containerBox.bottom;

    // Если указатель внутри элемента, проверяем только точку указателя
    if (isPointerInsideElement) {
      const elements = document.elementsFromPoint(
        pointerPosition.current.value.x,
        pointerPosition.current.value.y
      );
      for (const element of elements) {
        if (
          element instanceof HTMLElement &&
          element.hasAttribute(droppableDataName) &&
          !container.contains(element) &&
          element !== container &&
          !draggingElements.value.some(
            (dragEl) =>
              dragEl.node?.contains(element) || element === dragEl.node
          )
        ) {
          return element;
        }
      }
    }

    // Если указатель не внутри или не нашли подходящую зону, используем стандартную логику
    const topPoints = [
      { x: containerBox.x, y: containerBox.y }, // левый верх
      { x: containerBox.x + containerBox.width * 0.5, y: containerBox.y }, // верх центр
      { x: containerBox.x + containerBox.width, y: containerBox.y }, // правый верх
    ];

    const centerPoints = [
      { x: containerBox.x, y: containerBox.y + containerBox.height * 0.5 }, // левый центр
      { x: containerCenter.x, y: containerCenter.y }, // центр
      {
        x: containerBox.x + containerBox.width,
        y: containerBox.y + containerBox.height * 0.5,
      }, // правый центр
    ];

    const bottomPoints = [
      { x: containerBox.x, y: containerBox.y + containerBox.height }, // левый низ
      {
        x: containerBox.x + containerBox.width * 0.5,
        y: containerBox.y + containerBox.height,
      }, // низ центр
      {
        x: containerBox.x + containerBox.width,
        y: containerBox.y + containerBox.height,
      }, // правый низ
    ];

    const isPartOfDraggingElement = (element: Element) => {
      return draggingElements.value.some(
        (dragEl) => dragEl.node?.contains(element) || element === dragEl.node
      );
    };

    const findDropZonesForPoints = (
      points: Array<{ x: number; y: number }>
    ) => {
      const zones = new Set<HTMLElement>();
      points.forEach((point) => {
        const elements = document.elementsFromPoint(point.x, point.y);
        elements.forEach((element) => {
          if (
            element instanceof HTMLElement &&
            element.hasAttribute(droppableDataName) &&
            !container.contains(element) &&
            element !== container &&
            !isPartOfDraggingElement(element)
          ) {
            zones.add(element);
          }
        });
      });
      return zones;
    };

    // Сначала проверяем верхние точки
    let dropZones = findDropZonesForPoints(topPoints);

    // Если не нашли по верхним точкам, проверяем центр
    if (dropZones.size === 0) {
      dropZones = findDropZonesForPoints(centerPoints);
    }

    // Если всё ещё не нашли, проверяем нижние точки
    if (dropZones.size === 0) {
      dropZones = findDropZonesForPoints(bottomPoints);
    }

    if (dropZones.size === 0) return null;

    // Выбираем ближайшую зону к центру
    return Array.from(dropZones).reduce((nearest, current) => {
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

  const findNearestDraggableItem = (): HTMLElement | null => {
    if (!activeContainer.ref.value || !pointerPosition.current.value)
      return null;

    const container = activeContainer.ref.value;
    const containerBox = container.getBoundingClientRect();
    const containerCenter = getCenter(containerBox);

    // Проверяем, находится ли указатель мыши внутри элемента
    const isPointerInsideElement =
      pointerPosition.current.value.x >= containerBox.left &&
      pointerPosition.current.value.x <= containerBox.right &&
      pointerPosition.current.value.y >= containerBox.top &&
      pointerPosition.current.value.y <= containerBox.bottom;

    // Если указатель внутри элемента, проверяем только точку указателя
    if (isPointerInsideElement) {
      const elements = document.elementsFromPoint(
        pointerPosition.current.value.x,
        pointerPosition.current.value.y
      );
      for (const element of elements) {
        if (
          element instanceof HTMLElement &&
          element.hasAttribute(draggableDataName) &&
          !container.contains(element) &&
          element !== container &&
          !draggingElements.value.some(
            (dragEl) =>
              dragEl.node?.contains(element) || element === dragEl.node
          )
        ) {
          return element;
        }
      }
    }

    // Если указатель не внутри или не нашли подходящий элемент, используем стандартную логику
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

    const findDraggableItemsForPoints = (
      points: Array<{ x: number; y: number }>
    ) => {
      const items = new Set<HTMLElement>();
      points.forEach((point) => {
        const elements = document.elementsFromPoint(point.x, point.y);
        elements.forEach((element) => {
          if (
            element instanceof HTMLElement &&
            element.hasAttribute(draggableDataName) &&
            !container.contains(element) &&
            element !== container &&
            !draggingElements.value.some(
              (dragEl) =>
                dragEl.node?.contains(element) || element === dragEl.node
            )
          ) {
            items.add(element);
          }
        });
      });
      return items;
    };

    let draggableItems = findDraggableItemsForPoints(topPoints);

    if (draggableItems.size === 0) {
      draggableItems = findDraggableItemsForPoints(centerPoints);
    }

    if (draggableItems.size === 0) {
      draggableItems = findDraggableItemsForPoints(bottomPoints);
    }

    if (draggableItems.size === 0) return null;

    return Array.from(draggableItems).reduce((nearest, current) => {
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
    const nearestDropZone = findNearestDropZone();
    const nearestDraggableItem = findNearestDraggableItem();

    // Обновляем зону только если она реально изменилась
    if (nearestDropZone !== hovered.zone.value?.node) {
      findAndSetHoveredZone(nearestDropZone);
    }

    // Обновляем элемент только если он реально изменился
    if (nearestDraggableItem !== hovered.element.value?.node) {
      const element = elements.value.find(
        (el) => el.node === nearestDraggableItem
      );
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

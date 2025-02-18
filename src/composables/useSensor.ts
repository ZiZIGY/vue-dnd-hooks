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

  const getContainerPoints = () => {
    if (!activeContainer.ref.value) return [];

    const containerBox = activeContainer.ref.value.getBoundingClientRect();

    return [
      // Верхняя линия
      { x: containerBox.left, y: containerBox.top },
      { x: containerBox.left + containerBox.width / 2, y: containerBox.top },
      { x: containerBox.right, y: containerBox.top },

      // Центральная линия
      { x: containerBox.left, y: containerBox.top + containerBox.height / 2 },
      {
        x: containerBox.left + containerBox.width / 2,
        y: containerBox.top + containerBox.height / 2,
      },
      { x: containerBox.right, y: containerBox.top + containerBox.height / 2 },

      // Нижняя линия
      { x: containerBox.left, y: containerBox.bottom },
      { x: containerBox.left + containerBox.width / 2, y: containerBox.bottom },
      { x: containerBox.right, y: containerBox.bottom },
    ];
  };

  const isPointerInsideContainer = () => {
    if (!activeContainer.ref.value || !pointerPosition.current.value)
      return false;

    const containerBox = activeContainer.ref.value.getBoundingClientRect();
    const { x, y } = pointerPosition.current.value;

    return (
      x >= containerBox.left &&
      x <= containerBox.right &&
      y >= containerBox.top &&
      y <= containerBox.bottom
    );
  };

  const findNearestElements = (): {
    dropZone: HTMLElement | null;
    draggableItem: HTMLElement | null;
  } => {
    if (!activeContainer.ref.value || !pointerPosition.current.value)
      return { dropZone: null, draggableItem: null };

    const container = activeContainer.ref.value;
    const containerBox = container.getBoundingClientRect();
    const containerCenter = getCenter(containerBox);

    let nearestDropZone = new Set<HTMLElement>();
    let nearestDraggable = new Set<HTMLElement>();

    // Проверяем все точки контейнера
    const allPoints = [
      // Верхние точки
      { x: containerBox.left, y: containerBox.top },
      { x: containerBox.left + containerBox.width * 0.5, y: containerBox.top },
      { x: containerBox.right, y: containerBox.top },

      // Центральные точки
      { x: containerBox.left, y: containerBox.top + containerBox.height * 0.5 },
      {
        x: containerBox.left + containerBox.width * 0.5,
        y: containerBox.top + containerBox.height * 0.5,
      },
      {
        x: containerBox.right,
        y: containerBox.top + containerBox.height * 0.5,
      },

      // Нижние точки
      { x: containerBox.left, y: containerBox.bottom },
      {
        x: containerBox.left + containerBox.width * 0.5,
        y: containerBox.bottom,
      },
      { x: containerBox.right, y: containerBox.bottom },
    ];

    // Если курсор внутри контейнера, добавляем его точку в начало массива
    if (isPointerInsideContainer()) {
      allPoints.unshift({
        x: pointerPosition.current.value.x,
        y: pointerPosition.current.value.y,
      });
    }

    // Проверяем все точки
    allPoints.forEach((point) => {
      const elements = document.elementsFromPoint(point.x, point.y);
      elements.forEach((element) => {
        if (!(element instanceof HTMLElement)) return;
        if (
          element === container ||
          container.contains(element) ||
          draggingElements.value.some(
            (dragEl) =>
              dragEl.node?.contains(element) || element === dragEl.node
          )
        )
          return;

        if (element.hasAttribute(droppableDataName)) {
          nearestDropZone.add(element);
        }
        if (element.hasAttribute(draggableDataName)) {
          nearestDraggable.add(element);
        }
      });
    });

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
      dropZone: findNearest(nearestDropZone),
      draggableItem: findNearest(nearestDraggable),
    };
  };

  const detectCollisions = () => {
    // Получаем все точки для проверки
    const points = getContainerPoints();

    // Ищем элементы по неймспейсам
    const { dropZone, draggableItem } = findNearestElements();

    const element = elements.value.find((el) => el.node === draggableItem);
    const zone = zones.value.find((zone) => zone.node === dropZone);

    hovered.element.value = element ?? null;
    hovered.zone.value = zone ?? null;

    // Запускаем следующий кадр
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

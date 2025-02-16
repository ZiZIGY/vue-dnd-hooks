import { checkCollision, getBoundingBox } from '../utils/geometry';

import type { IDraggingElement } from '../types';
import type { Ref } from 'vue';
import { droppableDataName } from '../utils/namespaces';
import { useDnDStore } from './useDnDStore';
import { usePointer } from './usePointer';

export const useSensor = (elementRef: Ref<HTMLElement | null>) => {
  const { draggingElements, selectedElements, elements, activeContainer } =
    useDnDStore();

  const { onPointerStart, onPointerMove, onPointerEnd } =
    usePointer(elementRef);

  // Находим все dropzone элементы и проверяем коллизии
  const checkDropZoneCollisions = () => {
    if (!activeContainer.ref.value) return null;

    // Получаем AABB контейнера с перетаскиваемыми элементами
    const containerBox = getBoundingBox(activeContainer.ref.value);

    // Получаем все dropzone элементы
    const dropZones = document.querySelectorAll(`[${droppableDataName}]`);

    // Проверяем коллизии со всеми dropzone
    for (const dropZone of dropZones) {
      const dropZoneBox = getBoundingBox(dropZone as HTMLElement);

      if (checkCollision(containerBox, dropZoneBox)) {
        return dropZone as HTMLElement;
      }
    }

    return null;
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

  const activate = (event: PointerEvent) => {
    draggingElements.value = getDraggingElements(elementRef.value);

    onPointerStart(event);
  };

  const track = (event: PointerEvent | WheelEvent) => {
    onPointerMove(event);

    // Проверяем коллизии при каждом движении
    const collidingDropZone = checkDropZoneCollisions();
    if (collidingDropZone) {
      // Тут можно добавить логику при коллизии с dropzone
      console.log('Colliding with dropzone:', collidingDropZone);
    }
  };

  const deactivate = () => {
    onPointerEnd();
    draggingElements.value = [];
  };

  return {
    activate,
    track,
    deactivate,
  };
};

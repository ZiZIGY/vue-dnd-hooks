import { cssActions } from '../utils/cssActions';
import { useDnDStore } from './useDnDStore';

export const useDraggingManager = (id: string) => {
  const store = useDnDStore();

  const initDragState = (event: PointerEvent, rect: DOMRect) => {
    store.coordinates = {
      x: event.clientX,
      y: event.clientY,
    };

    store.offset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      percentX: ((event.clientX - rect.left) / rect.width) * 100,
      percentY: ((event.clientY - rect.top) / rect.height) * 100,
    };

    store.isDragging = true;
    cssActions.draggingStart();

    // Сразу определяем элемент/зону под курсором
    detectElement(event);
  };

  const setupDraggingElements = (isSelected: boolean) => {
    const element = store.elements.get(id);
    if (!element) return;

    if (isSelected) {
      store.selectedElements.forEach((value, key) =>
        store.draggingElements.set(key, value)
      );
    } else {
      store.draggingElements.set(id, element);
      store.selectedElements = new Map();
    }

    store.draggingElements.forEach((element) => {
      element.node?.setAttribute('data-dnd-dragging', 'true');
    });
  };

  const clearDraggingElements = () => {
    store.draggingElements.forEach((element) => {
      element.node?.removeAttribute('data-dnd-dragging');
    });
    store.draggingElements = new Map();
  };

  const detectElement = (event: PointerEvent) => {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if (!element) {
      if (store.hovered.zoneId) {
        store.zones.get(store.hovered.zoneId)?.onLeave?.(store);
      }
      store.hovered = { elementId: null, zoneId: null };
      return;
    }

    // Проверяем все драгающиеся элементы
    const isDraggingElement = Array.from(store.draggingElements.keys()).some(
      (dragId) => element.closest(`[data-dnd-id="${dragId}"]`)
    );
    if (isDraggingElement) return;

    // Остальная логика...
    const dropZone = element.closest('[data-dnd-drop-zone]');
    const newZoneId = dropZone?.getAttribute('data-dnd-id') || null;

    if (newZoneId !== store.hovered.zoneId) {
      if (store.hovered.zoneId) {
        store.zones.get(store.hovered.zoneId)?.onLeave?.(store);
      }
      if (newZoneId) {
        store.zones.get(newZoneId)?.onHover?.(store);
      }
    }

    store.hovered.zoneId = newZoneId;

    if (element.closest(`[data-dnd-id="${id}"]`)) return;

    const draggableElement = element.closest('[data-dnd-id]');
    if (
      draggableElement &&
      !draggableElement.hasAttribute('data-dnd-drop-zone')
    ) {
      store.hovered.elementId = draggableElement.getAttribute('data-dnd-id');
    } else {
      store.hovered.elementId = null;
    }
  };

  const updateCoordinates = (event: PointerEvent) => {
    store.coordinates = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const resetDragState = () => {
    store.isDragging = false;
    store.offset = { x: 0, y: 0, percentX: 0, percentY: 0 };
    store.coordinates = undefined;
    store.hovered = { elementId: null, zoneId: null };

    cssActions.draggingEnd();
  };

  return {
    initDragState,
    setupDraggingElements,
    clearDraggingElements,
    detectElement,
    updateCoordinates,
    resetDragState,
  };
};

import { onBeforeUnmount, onMounted, shallowRef } from 'vue';

import type { IUseElementOptions } from '../types';
import { useDnDStore } from './useDnDStore';
import { useDraggingManager } from './useDraggingManager';
import { useElementManager } from './useElementManager';
import { useSelectionManager } from './useSelectionManager';

export const useDrag = <T>(options?: IUseElementOptions<T>) => {
  const store = useDnDStore();
  const id = options?.id || crypto.randomUUID();
  const elementRef = shallowRef<HTMLElement | Element | null>(null);

  const {
    selectElement,
    toggleElement,
    isElementSelected,
    clearSelectedElements,
  } = useSelectionManager(id);

  const {
    initDragState,
    setupDraggingElements,
    clearDraggingElements,
    detectElement,
    updateCoordinates,
    resetDragState,
  } = useDraggingManager(id);

  const { registerElement, unregisterElement, isOvered, isDragging } =
    useElementManager(id, options);

  const attachListeners = () => {
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onEnd);
    document.addEventListener('keydown', onCancel);
  };

  const detachListeners = () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onEnd);
    document.removeEventListener('keydown', onCancel);
  };

  const startDragging = (event: PointerEvent) => {
    const element = store.elements.get(id);
    if (!element) return;

    const currentRect = element.node?.getBoundingClientRect();
    if (!currentRect) return;

    event.preventDefault();

    initDragState(event, currentRect);
    setupDraggingElements(isElementSelected.value);
    detectElement(event);
    attachListeners();
  };

  const onMove = (event: PointerEvent) => {
    updateCoordinates(event);
    detectElement(event);
  };

  const onEnd = () => {
    if (store.hovered.zoneId && store.zones.has(store.hovered.zoneId)) {
      const zone = store.zones.get(store.hovered.zoneId);
      if (!zone) return;

      store.zones.get(store.hovered.zoneId)?.onDrop?.(store, zone.state);
    }

    clearDraggingElements();
    clearSelectedElements();
    resetDragState();
    detachListeners();
  };

  const onCancel = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      clearDraggingElements();
      resetDragState();
      detachListeners();
    }
  };

  onMounted(() => {
    if (!elementRef.value) return;
    registerElement(elementRef.value);
  });

  onBeforeUnmount(() => {
    unregisterElement();
    detachListeners();
  });

  return {
    uuid: id,
    elementRef,
    startDragging,
    isOvered,
    selectElement,
    toggleElement,
    isSelected: isElementSelected,
    store,
    isDragging,
  };
};

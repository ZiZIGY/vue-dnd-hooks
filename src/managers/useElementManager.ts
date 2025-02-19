import { computed, ref } from 'vue';

import type { IUseDragOptions } from '../types';
import { draggableDataName } from '../utils/namespaces';
import { useBounding } from '../composables/useBounding';
import { useDnDStore } from '../composables/useDnDStore';

export const useElementManager = (options?: IUseDragOptions) => {
  const store = useDnDStore();

  const elementRef = ref<HTMLElement | null>(null);

  const isSelected = computed<boolean>(() =>
    store.selectedElements.value.some(
      (element) => element.node === elementRef.value
    )
  );

  const isOvered = computed<boolean>(
    () => store.hovered.element.value?.node === elementRef.value
  );

  const isDragging = computed<boolean>(() =>
    store.draggingElements.value.some(
      (element) => element.node === elementRef.value
    )
  );

  const registerElement = () => {
    if (!elementRef.value) throw new Error('ElementRef is not set');

    store.elements.value.push({
      node: elementRef.value,
      groups: options?.groups ?? [],
      layer: options?.layer ?? null,
      defaultLayer: options?.layer ?? null,
      events: options?.events ?? {},
    });

    elementRef.value.setAttribute(draggableDataName, 'true');
  };

  const unregisterElement = () => {
    const index = store.elements.value.findIndex(
      (element) => element.node === elementRef.value
    );
    if (index !== -1) store.elements.value.splice(index, 1);
  };

  return {
    elementRef,
    registerElement,
    unregisterElement,
    isSelected,
    isDragging,
    isOvered,
  };
};

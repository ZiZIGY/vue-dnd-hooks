import { computed, ref } from 'vue';

import type { IUseDragOptions } from '../types';
import { useDnDStore } from '../composables/useDnDStore';

export const useElementManager = (options?: IUseDragOptions) => {
  const store = useDnDStore();

  const elementRef = ref<HTMLElement | null>(null);

  const isSelected = computed<boolean>(() =>
    store.selectedElements.some((element) => element.node === elementRef.value)
  );
  const isDragging = computed<boolean>(
    () =>
      store.draggingElements?.some(
        (element) => element.node === elementRef.value
      ) ?? false
  );

  const registerElement = () => {
    store.elements.push({
      node: elementRef.value,
      groups: options?.groups ?? [],
    });
  };

  const unregisterElement = () => {
    const index = store.elements.findIndex(
      (element) => element.node === elementRef.value
    );
    if (index !== -1) store.elements.splice(index, 1);
  };

  return {
    elementRef,
    registerElement,
    unregisterElement,
    isSelected,
    isDragging,
  };
};

import type { IUseElementOptions } from '../types';
import { computed } from 'vue';
import { useDnDStore } from '../hooks/useDnDStore';

/**
 * Manages draggable element functionality
 */
export const useElementManager = <T>(
  id: string,
  options?: IUseElementOptions<T>
) => {
  const store = useDnDStore();

  const registerElement = (element: HTMLElement | Element) => {
    element.setAttribute('data-dnd-id', id);
    element.setAttribute('data-dnd-draggable', 'true');

    store.elements.set(id, {
      id,
      defaultOuterHTML: element.outerHTML,
      node: element,
      group: options?.group || [],
      defaultLayer: options?.layer,
      layer: options?.layer,
      state: options?.state || undefined,
      onEnd: options?.events?.onEnd,
    });
  };

  const unregisterElement = () => store.elements.delete(id);

  const isOvered = computed<boolean>(() => store.hovered.elementId === id);
  const isDragging = computed<boolean>(() =>
    store.draggingElements instanceof Map
      ? store.draggingElements.has(id)
      : store.draggingElements?.id === options?.id
  );

  return {
    registerElement,
    unregisterElement,
    isOvered,
    isDragging,
  };
};

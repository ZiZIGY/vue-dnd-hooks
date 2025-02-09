import type { IUseDropOptions } from '../types';
import { computed } from 'vue';
import { useDnDStore } from './useDnDStore';

export const useDropManager = <T>(id: string, options?: IUseDropOptions<T>) => {
  const store = useDnDStore();

  const registerDropZone = (element: HTMLElement | Element) => {
    element.setAttribute('data-dnd-id', id);
    element.setAttribute('data-dnd-drop-zone', 'true');

    store.zones.set(id, {
      node: element,
      group: options?.group || [],
      state: options?.state,
      onDrop: options?.events?.onDrop,
      onHover: options?.events?.onHover,
      onLeave: options?.events?.onLeave,
    });
  };

  const unregisterDropZone = () => {
    store.zones.delete(id);
  };

  const isOvered = computed(() => store.hovered.zoneId === id);

  const isNotAllowed = computed(() => {
    const zone = store.zones.get(id);
    if (!zone) return false;

    if (!store.isDragging) return false;

    if (!zone.group.length) return false;

    return Array.from(store.draggingElements.values()).some((element) => {
      if (!element.group.length) return true;

      return !element.group.some((group) => zone.group.includes(group));
    });
  });

  const handleDrop = () => {
    if (store.hovered.zoneId === id && !isNotAllowed.value) {
      store.zones.get(id)?.onDrop?.(store, options?.state);
    }
  };

  return {
    registerDropZone,
    unregisterDropZone,
    isOvered,
    isNotAllowed,
    handleDrop,
  };
};

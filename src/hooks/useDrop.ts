import { onBeforeUnmount, onMounted, shallowRef } from 'vue';

import type { IUseDropOptions } from '../types';
import { useDropManager } from './useDropManager';

export const useDrop = (options?: IUseDropOptions) => {
  const id = options?.id || crypto.randomUUID();
  const elementRef = shallowRef<HTMLElement | Element | null>(null);

  const { registerDropZone, unregisterDropZone, isOvered, isNotAllowed } =
    useDropManager(id, options);

  onMounted(() => {
    if (!elementRef.value) return;
    registerDropZone(elementRef.value);
  });

  onBeforeUnmount(unregisterDropZone);

  return {
    elementRef,
    isOvered,
    isNotAllowed,
  };
};

import { Ref, onMounted, onUnmounted, ref, watch } from 'vue';

import type { ElementRect } from '@/types';

export const useRect = (elementRef: Ref<HTMLElement | null>) => {
  const initialRect = ref<ElementRect | null>(null);
  const currentRect = ref<ElementRect | null>(null);

  let resizeObserver: ResizeObserver | null = null;
  let mutationObserver: MutationObserver | null = null;

  const updateRect = () => {
    if (!elementRef.value || !(elementRef.value instanceof Element)) return;

    const clientRect = elementRef.value.getBoundingClientRect();
    currentRect.value = {
      x: clientRect.x + window.scrollX,
      y: clientRect.y + window.scrollY,
      width: clientRect.width,
      height: clientRect.height,
      top: clientRect.top + window.scrollY,
      right: clientRect.right + window.scrollX,
      bottom: clientRect.bottom + window.scrollY,
      left: clientRect.left + window.scrollX,
    };

    if (!initialRect.value) {
      initialRect.value = { ...currentRect.value };
    }
  };

  const setupObservers = (target: HTMLElement) => {
    resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(target);

    mutationObserver = new MutationObserver(updateRect);
    mutationObserver.observe(target, { attributes: true });
  };

  const cleanupObservers = () => {
    resizeObserver?.disconnect();
    mutationObserver?.disconnect();
    resizeObserver = null;
    mutationObserver = null;
  };

  watch(
    elementRef,
    (newEl, oldEl) => {
      if (oldEl) cleanupObservers();
      if (newEl) {
        updateRect();
        setupObservers(newEl);
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    if (elementRef.value) {
      updateRect();
      setupObservers(elementRef.value);
    }
  });

  onUnmounted(cleanupObservers);

  return {
    initialRect,
    currentRect,
  };
};

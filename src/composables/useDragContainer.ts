import { onBeforeUnmount, onMounted, ref } from 'vue';

import { useBounding } from './useBounding';
import { useDnDStore } from './useDnDStore';

export const useDragContainer = () => {
  const elementRef = ref<HTMLElement | null>(null);

  const { draggingElements, pointerPosition, isDragging, activeContainer } =
    useDnDStore();

  const rect = useBounding(elementRef);

  onMounted(() => {
    activeContainer.ref = elementRef;
    activeContainer.rect = rect;
  });

  onBeforeUnmount(() => {
    activeContainer.ref.value = null;
    activeContainer.rect.value = null;
  });

  return {
    elementRef,
    draggingElements,
    pointerPosition,
    isDragging,
  };
};

import { DnDEntityID, IDnDProvider, UseDroppableOptions } from '@/@types';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { dropEventName, setID } from '@/utils';

import { useDnDContext } from '@/hooks/useDnDContext';
import { useRect } from '@/hooks/useRect';

export const useDroppable = (
  id: DnDEntityID,
  contextName: string,
  options: UseDroppableOptions
) => {
  const containerRef = ref<HTMLElement | null>(null);
  const { currentRect, initialRect } = useRect(containerRef);

  const context = useDnDContext<IDnDProvider>(contextName);
  if (!context) {
    throw new Error(`DnD context "${contextName}" not found`);
  }

  const isOver = computed(() => {
    return context.overElement?.node === containerRef.value;
  });

  const dropHandle = () => {
    if (options.onDrop) {
      options.onDrop();
    }
  };

  onMounted(() => {
    if (!containerRef.value) return;

    setID(containerRef.value, id);

    containerRef.value.addEventListener(dropEventName, dropHandle, false);
    containerRef.value.dataset.droppable = 'true';
  });

  return {
    containerRef,
    initialRect,
    currentRect,
    isOver,
  };
};

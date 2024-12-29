import { DnDEntityID, IDnDProvider, UseDroppableOptions } from '@/@types';
import { computed, onMounted, ref, watch } from 'vue';

import { setDataAttribute } from '@/utils';
import { useDnDContext } from '@/hooks/useDnDContext';
import { useRect } from '@/hooks/useRect';

export const useDroppable = <T = void>(
  id: DnDEntityID,
  contextName: string,
  options: UseDroppableOptions<T>
) => {
  const containerRef = ref<HTMLElement | null>(null);
  const { currentRect, initialRect } = useRect(containerRef);

  const context = useDnDContext<T & IDnDProvider>(contextName);
  if (!context) {
    throw new Error(`DnD context "${contextName}" not found`);
  }

  const isOver = computed(
    () => context.overElement?.node === containerRef.value && context.isDragging
  );

  let wasOver = false;
  watch([isOver, () => context.isDragging], ([value, isDragging]) => {
    if (value && !wasOver) {
      options.onOver?.(context);
    } else if (!value && wasOver) {
      options.onLeave?.(context);
    }
    if (wasOver && !isDragging) {
      options.onDrop?.(context);
    }
    wasOver = value;
  });

  onMounted(() => {
    if (!containerRef.value) return;

    setDataAttribute(containerRef.value, 'dndId', id.toString());
    setDataAttribute(containerRef.value, 'dndDroppable', 'true');
  });

  return {
    containerRef,
    initialRect,
    currentRect,
    isOver,
  };
};

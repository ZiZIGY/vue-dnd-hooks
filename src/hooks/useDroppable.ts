import { DnDEntityID, IDnDProvider } from '@/@types';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { dropEventName, setID } from '@/utils';

import { useDnDContext } from '@/hooks/useDnDContext';
import { useRect } from '@/hooks/useRect';

interface DroppableOptions {
  onDrop?: () => void;
  contextName?: string;
}

export const useDroppable = (id: DnDEntityID, options: DroppableOptions) => {
  const containerRef = ref<HTMLElement | null>(null);
  const { currentRect, initialRect } = useRect(containerRef);

  const contextRef = ref<IDnDProvider | null>();

  const isOver = computed(() => {
    if (!contextRef.value) return false;
    return contextRef.value.overElement === containerRef.value;
  });

  const dropHandle = () => {
    if (options.onDrop) {
      options.onDrop();
    }
  };

  onMounted(() => {
    if (!containerRef.value) return;

    if (options?.contextName) {
      contextRef.value = useDnDContext(options.contextName);
    }

    setID(containerRef.value, id);

    containerRef.value.addEventListener(dropEventName, dropHandle, false);
    containerRef.value.dataset.droppable = 'true';
  });

  onUnmounted(() => {});

  return {
    containerRef,
    initialRect,
    currentRect,
    isOver,
  };
};

import { computed, onMounted, ref } from 'vue';

import { DnDProvider } from '@/types';
import { isGroupsCompatible } from '@/utils';
import { useRect } from './useRect';

interface UseDroppableOptions<T = void> {
  context: DnDProvider<T>;
  group?: string | string[];
  hooks?: {
    onOver?: (context: DnDProvider<T>) => void;
    onLeave?: (context: DnDProvider<T>) => void;
    onDrop?: (context: DnDProvider<T>) => void;
  };
}

export const useDroppable = <T = void>(options: UseDroppableOptions<T>) => {
  const elementRef = ref<HTMLElement | null>(null);

  let defaultDrop = options.context.hooks?.onEnd;

  const { initialRect, currentRect } = useRect(elementRef);

  const isOver = computed(() => {
    if (!options.context.isDragging) return false;

    return options.context.hoveredElement?.node === elementRef.value;
  });

  const dropOver = (event: PointerEvent) => {
    event.stopPropagation();

    if (!options.context.isDragging) return;

    if (options?.context?.draggingElement?.node?.contains(event.target as Node))
      return;

    if (
      !isGroupsCompatible(
        options?.context?.draggingElement?.group,
        options?.group
      )
    )
      return;

    elementRef.value?.setAttribute('data-hovered', 'true');

    if (options.hooks?.onDrop && options.context.hooks?.onEnd) {
      options.context.hooks.onEnd = options.hooks.onDrop;
    }

    options.context.hoveredElement = {
      node: elementRef.value,
    };
    options.hooks?.onOver?.(options?.context);
  };

  const dropLeave = (event: PointerEvent) => {
    event.stopPropagation();

    if (!elementRef.value && !options?.context.isDragging) return;

    if (options.hooks?.onDrop && options.context.hooks?.onEnd) {
      options.context.hooks.onEnd = defaultDrop;
    }

    elementRef.value?.removeAttribute('data-hovered');

    options.context.hoveredElement = null;
    options.hooks?.onLeave?.(options?.context);
  };

  onMounted(() => {
    if (!elementRef.value) return;

    elementRef.value.addEventListener('pointerover', dropOver);
    elementRef.value.addEventListener('pointerleave', dropLeave);

    elementRef.value.setAttribute('data-dnd-entity', 'true');
    elementRef.value.setAttribute('data-dnd-droppable', 'true');
  });

  return {
    elementRef,
    isOver,
    initialRect,
    currentRect,
  };
};

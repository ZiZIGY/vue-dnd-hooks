import type { DnDEntityID, IDnDProvider, UseDraggableOptions } from '@/@types';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { setDataAttribute, userSelect } from '@/utils';

import { useDnDContext } from './useDnDContext';
import { useRect } from './useRect';

export const useDraggable = <T = void>(
  id: DnDEntityID,
  contextName: string,
  options?: UseDraggableOptions<T>
) => {
  const elementRef = ref<HTMLElement | null>(null);
  const isDragging = ref(false);

  const context = useDnDContext<T & IDnDProvider>(contextName);
  if (!context) throw new Error(`DnD context "${contextName}" not found`);

  const { currentRect, initialRect } = useRect(elementRef);

  const position = reactive({
    x: 0,
    y: 0,
  });

  const offset = reactive({
    x: 0,
    y: 0,
    percentX: 0,
    percentY: 0,
  });

  let lastScrollX = window.scrollX;
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (!isDragging.value) return;

    const dx = window.scrollX - lastScrollX;
    const dy = window.scrollY - lastScrollY;

    position.x += dx;
    position.y += dy;

    lastScrollX = window.scrollX;
    lastScrollY = window.scrollY;
  };

  const start = (event: PointerEvent) => {
    if (!currentRect.value) return;

    context.isDragging = true;

    userSelect.disable();
    isDragging.value = true;

    position.x = event.pageX;
    position.y = event.pageY;

    offset.x = event.pageX - currentRect.value.left;
    offset.y = event.pageY - currentRect.value.top;

    offset.percentX = (offset.x / currentRect.value.width) * 100;
    offset.percentY = (offset.y / currentRect.value.height) * 100;

    lastScrollX = window.scrollX;
    lastScrollY = window.scrollY;

    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', end);
    window.addEventListener('scroll', handleScroll);

    options?.dragStart?.(context);
  };

  const move = (event: PointerEvent) => {
    position.x = event.pageX;
    position.y = event.pageY;

    if (!currentRect.value) return;

    // Проверяем только 4 крайние точки
    const points = [
      { x: position.x - currentRect.value.width / 2, y: position.y }, // левая точка
      { x: position.x + currentRect.value.width / 2, y: position.y }, // правая точка
      { x: position.x, y: position.y - currentRect.value.height / 2 }, // верхняя точка
      { x: position.x, y: position.y + currentRect.value.height / 2 }, // нижняя точка
    ];

    for (const point of points) {
      const target = document.elementFromPoint(
        point.x - window.scrollX,
        point.y - window.scrollY
      );

      const droppable = target?.closest('[data-dnd-droppable]');

      if (droppable) {
        const rect = droppable.getBoundingClientRect();
        const droppableId = droppable.getAttribute('data-dnd-id');

        if (!droppableId) return;

        const dragRect = {
          x: position.x - window.scrollX - currentRect.value.width / 2,
          y: position.y - window.scrollY - currentRect.value.height / 2,
          w: currentRect.value.width,
          h: currentRect.value.height,
        };

        const dropRect = {
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.height,
        };

        if (
          !(
            dragRect.x > dropRect.x + dropRect.w ||
            dragRect.x + dragRect.w < dropRect.x ||
            dragRect.y > dropRect.y + dropRect.h ||
            dragRect.y + dragRect.h < dropRect.y
          )
        ) {
          context.overElement = {
            id: droppableId,
            node: droppable as HTMLElement,
          };
          return;
        }
      } else {
        context.overElement = null;
      }
    }

    options?.dragMove?.(context);
  };

  const end = () => {
    userSelect.enable();
    isDragging.value = false;

    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', end);
    window.removeEventListener('scroll', handleScroll);

    if (options?.dragEnd) {
      options.dragEnd(context);

      console.log('options');
    } else {
      context.dragEnd?.(context);
    }

    context.isDragging = false;
    context.overElement = null;
  };

  onMounted(() => {
    if (elementRef.value) {
      setDataAttribute(elementRef.value, 'dndId', id.toString());
      elementRef.value.addEventListener('pointerdown', start);
    }
  });

  onUnmounted(() => {
    if (elementRef.value)
      elementRef.value.removeEventListener('pointerdown', start);

    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', end);
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    elementRef,
    isDragging,
    position,
    offset,
    currentRect,
    initialRect,
  };
};

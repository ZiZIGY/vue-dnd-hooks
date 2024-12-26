import type { DnDEntityID, IDnDProvider, UseDraggableOptions } from '@/@types';
import { dropEventName, setID, userSelect } from '@/utils';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

import { useDnDContext } from './useDnDContext';
import { useRect } from './useRect';

export const useDraggable = (
  id: DnDEntityID,
  options?: UseDraggableOptions
) => {
  const elementRef = ref<HTMLElement | null>(null);
  const isDragging = ref(false);

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

  const contextRef = ref<IDnDProvider | null>();

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

    if (contextRef.value) {
      contextRef.value.isDragging = true;
    }

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

    options?.onStart?.();
  };

  const move = (event: PointerEvent) => {
    position.x = event.pageX;
    position.y = event.pageY;

    options?.onMove?.();

    if (!currentRect.value || !contextRef.value) return;

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

      const droppable = target?.closest('[data-droppable]');

      if (droppable) {
        const rect = droppable.getBoundingClientRect();

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
          contextRef.value.overElement = droppable as HTMLElement;
          return;
        }
      } else {
        contextRef.value.overElement = null;
      }
    }
  };

  const end = () => {
    userSelect.enable();
    isDragging.value = false;

    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', end);
    window.removeEventListener('scroll', handleScroll);

    if (contextRef.value) {
      contextRef.value.overElement?.dispatchEvent(new Event(dropEventName));

      contextRef.value.isDragging = false;
      contextRef.value.overElement = null;
    }

    options?.onEnd?.();
  };

  onMounted(() => {
    if (elementRef.value) {
      setID(elementRef.value, id);
      elementRef.value.addEventListener('pointerdown', start);
    }

    if (options?.contextName) {
      contextRef.value = useDnDContext(options.contextName);
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

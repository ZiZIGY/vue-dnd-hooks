import { ElementRect, UseDraggableOptions } from '@/@types';
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { setID, userSelect } from '@/utils';

export const useDraggable = (options: UseDraggableOptions) => {
  const elementRef = ref<HTMLElement | null>(null);
  const isDragging = ref(false);

  const initialRect = ref<ElementRect | null>(null);
  const currentRect = ref<ElementRect | null>(null);

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

  let resizeObserver: ResizeObserver | null = null;
  let mutationObserver: MutationObserver | null = null;

  let lastScrollX = window.scrollX;
  let lastScrollY = window.scrollY;

  const updateRect = () => {
    if (!elementRef.value || !(elementRef.value instanceof Element)) {
      return; // Не обнуляем currentRect, сохраняем последнее значение
    }

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
    mutationObserver.observe(target, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    updateRect();
  };

  const cleanupObservers = () => {
    resizeObserver?.disconnect();
    mutationObserver?.disconnect();
    resizeObserver = null;
    mutationObserver = null;
  };

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

    options.onStart?.();
  };

  const move = (event: PointerEvent) => {
    position.x = event.pageX;
    position.y = event.pageY;

    options.onMove?.();
  };

  const end = () => {
    userSelect.enable();
    isDragging.value = false;

    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', end);
    window.removeEventListener('scroll', handleScroll);

    options.onEnd?.();
  };

  watch(
    elementRef,
    (newEl, oldEl) => {
      if (oldEl) {
        oldEl.removeEventListener('pointerdown', start);
        cleanupObservers();
      }

      if (newEl) {
        newEl.addEventListener('pointerdown', start);
        setID(newEl, options.id);
        setupObservers(newEl);
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    if (elementRef.value) {
      setID(elementRef.value, options.id);
      elementRef.value.addEventListener('pointerdown', start);
      setupObservers(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener('pointerdown', start);
    }
    cleanupObservers();
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

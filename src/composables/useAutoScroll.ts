import { ref, watch } from 'vue';

import type { IPoint } from '../types';
import type { Ref } from 'vue';

export const useAutoScroll = (
  container: Ref<HTMLElement | null>,
  point: Ref<IPoint | null>,
  options: Record<string, any> = {}
) => {
  const { threshold = 50, speed = 10, disabled = false } = options;

  const isScrolling = ref(false);

  // Функция для выполнения скролла
  const performScroll = () => {
    if (!container.value || !point.value || disabled) return;

    const rect = container.value.getBoundingClientRect();
    const scrollTop = container.value.scrollTop;
    const scrollLeft = container.value.scrollLeft;

    let needsScroll = false;

    // Проверяем верхнюю границу
    if (point.value.y - rect.top < threshold) {
      container.value.scrollTop = scrollTop - speed;
      needsScroll = true;
    }

    // Проверяем нижнюю границу
    if (rect.bottom - point.value.y < threshold) {
      container.value.scrollTop = scrollTop + speed;
      needsScroll = true;
    }

    // Проверяем левую границу
    if (point.value.x - rect.left < threshold) {
      container.value.scrollLeft = scrollLeft - speed;
      needsScroll = true;
    }

    // Проверяем правую границу
    if (rect.right - point.value.x < threshold) {
      container.value.scrollLeft = scrollLeft + speed;
      needsScroll = true;
    }

    isScrolling.value = needsScroll;

    // Продолжаем скролл если нужно
    if (needsScroll) {
      requestAnimationFrame(performScroll);
    }
  };

  // Следим за изменением точки
  watch(
    point,
    (newPoint) => {
      if (newPoint) {
        performScroll();
      } else {
        isScrolling.value = false;
      }
    },
    { immediate: true }
  );

  return {
    isScrolling,
  };
};

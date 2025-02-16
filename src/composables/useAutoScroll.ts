import type { IAutoScrollOptions, IPoint } from '../types';
import { ref, watch } from 'vue';

import type { Ref } from 'vue';

export const useAutoScroll = (
  container: Ref<HTMLElement | null>,
  point: Ref<IPoint | null>,
  options: IAutoScrollOptions = {}
) => {
  const { threshold = 50, speed = 10, disabled = false } = options;
  const isScrolling = ref(false);
  let rafId: number | null = null;

  // Добавляем отслеживание времени
  let lastTime: number | null = null;

  const targetFPS = 144;
  const frameTime = 1000 / targetFPS;

  // Кэшируем вычисления
  let lastRect: DOMRect | null = null;
  let lastScrollTop = 0;
  let lastScrollLeft = 0;

  const performScroll = (timestamp: number) => {
    if (!container.value || !point.value || disabled) {
      isScrolling.value = false;
      return;
    }

    // Вычисляем дельту времени
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;

    // Пропускаем кадр если прошло слишком мало времени
    if (deltaTime < frameTime) {
      rafId = requestAnimationFrame(performScroll);
      return;
    }

    // Вычисляем множитель скорости на основе дельты
    const speedMultiplier = deltaTime / frameTime;
    const currentSpeed = speed * speedMultiplier;

    lastTime = timestamp;

    // Обновляем кэш только если изменились размеры или позиция
    const currentScrollTop = container.value.scrollTop;
    const currentScrollLeft = container.value.scrollLeft;

    if (
      !lastRect ||
      lastScrollTop !== currentScrollTop ||
      lastScrollLeft !== currentScrollLeft
    ) {
      lastRect = container.value.getBoundingClientRect();
      lastScrollTop = currentScrollTop;
      lastScrollLeft = currentScrollLeft;
    }

    let needsScroll = false;

    // Используем кэшированные значения и скорректированную скорость
    if (point.value.y - lastRect.top < threshold) {
      container.value.scrollTop = lastScrollTop - currentSpeed;
      needsScroll = true;
    }
    if (lastRect.bottom - point.value.y < threshold) {
      container.value.scrollTop = lastScrollTop + currentSpeed;
      needsScroll = true;
    }

    if (point.value.x - lastRect.left < threshold) {
      container.value.scrollLeft = lastScrollLeft - currentSpeed;
      needsScroll = true;
    }
    if (lastRect.right - point.value.x < threshold) {
      container.value.scrollLeft = lastScrollLeft + currentSpeed;
      needsScroll = true;
    }

    isScrolling.value = needsScroll;

    if (needsScroll) {
      rafId = requestAnimationFrame(performScroll);
    }
  };

  const stopScroll = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lastRect = null;
    lastScrollTop = 0;
    lastScrollLeft = 0;
    lastTime = null;
    isScrolling.value = false;
  };

  watch(point, (newPoint) => {
    if (newPoint) {
      if (rafId) cancelAnimationFrame(rafId);
      lastTime = null; // Сбрасываем время при новом драге
      performScroll(performance.now());
    } else {
      stopScroll();
    }
  });

  watch(
    () => disabled,
    (isDisabled) => {
      if (isDisabled) {
        stopScroll();
      }
    }
  );

  return {
    isScrolling,
  };
};

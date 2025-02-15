import { computed, type Ref } from 'vue';
import type { IPoint } from '../types';
import { getDirection as _getDirection } from '../utils/geometry';

export const useGeometry = (
  pointA: Ref<IPoint | null>,
  pointB: Ref<IPoint | null>
) => {
  const delta = computed(() => ({
    x: (pointB.value?.x ?? 0) - (pointA.value?.x ?? 0),
    y: (pointB.value?.y ?? 0) - (pointA.value?.y ?? 0),
  }));

  const direction = computed(() => _getDirection(delta.value));

  const distance = computed(() => {
    const dx = (pointB.value?.x ?? 0) - (pointA.value?.x ?? 0);
    const dy = (pointB.value?.y ?? 0) - (pointA.value?.y ?? 0);
    return Math.sqrt(dx * dx + dy * dy);
  });

  const angle = computed(() => {
    const dx = (pointB.value?.x ?? 0) - (pointA.value?.x ?? 0);
    const dy = (pointB.value?.y ?? 0) - (pointA.value?.y ?? 0);
    return Math.atan2(dy, dx) * (180 / Math.PI);
  });

  return {
    delta,
    direction,
    distance,
    angle,
  };
};

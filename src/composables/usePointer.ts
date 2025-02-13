import { getDelta, getOffset } from '../utils/collision';

import type { IPointerPosition } from '../types';
import { ref, type Ref } from 'vue';

export const usePointer = (elementRef: Ref<HTMLElement | null>) => {
  const position = ref<IPointerPosition | undefined>(undefined);

  const onPointerStart = (event: PointerEvent) => {
    position.value = {
      start: { x: event.clientX, y: event.clientY },
      current: { x: event.clientX, y: event.clientY },
      delta: { x: 0, y: 0 },
      offset: getOffset(elementRef.value, {
        x: event.clientX,
        y: event.clientY,
      }),
    };
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!position.value) return;

    position.value.current = { x: event.clientX, y: event.clientY };
    position.value.delta = getDelta(
      position.value.start,
      position.value.current
    );
  };

  const onPointerEnd = () => {
    position.value = undefined;
  };

  return {
    position,
    onPointerStart,
    onPointerMove,
    onPointerEnd,
  };
};

import type { Ref } from 'vue';
import { usePointer } from './usePointer';

export const useSensor = (elementRef: Ref<HTMLElement | null>) => {
  const { position, onPointerStart, onPointerMove, onPointerEnd } =
    usePointer(elementRef);

  const activate = (event: PointerEvent) => {
    onPointerStart(event);
  };

  const track = (event: PointerEvent) => {
    onPointerMove(event);
  };

  const deactivate = () => {
    onPointerEnd();
  };

  return {
    position,
    activate,
    track,
    deactivate,
  };
};

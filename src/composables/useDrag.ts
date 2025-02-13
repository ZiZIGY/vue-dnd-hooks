import { onBeforeUnmount, onMounted } from 'vue';

import type { IUseDragOptions } from '../types';
import { useElementManager } from '../managers/useElementManager';
import { useSensor } from './useSensor';

export const useDrag = (options?: IUseDragOptions) => {
  const {
    elementRef,
    registerElement,
    unregisterElement,
    isDragging,
    isSelected,
  } = useElementManager(options);

  const { position, activate, track, deactivate } = useSensor(elementRef);

  const handleDragStart = (event: PointerEvent) => {
    activate(event);

    document.addEventListener('pointermove', handleDragMove);
    document.addEventListener('pointerup', handleDragEnd);
  };

  const handleDragMove = (event: PointerEvent) => {
    track(event);
  };

  const handleDragEnd = (event: PointerEvent) => {
    deactivate();

    document.removeEventListener('pointermove', handleDragMove);
    document.removeEventListener('pointerup', handleDragEnd);
  };

  onMounted(registerElement);
  onBeforeUnmount(unregisterElement);

  return {
    elementRef,
    isDragging,
    isSelected,
    handleDragStart,
  };
};

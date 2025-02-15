import { onBeforeUnmount, onMounted } from 'vue';

import type { IUseDragOptions } from '../types';
import { useDnDStore } from './useDnDStore';
import { useElementManager } from '../managers/useElementManager';
import { useInteractionManager } from '../managers/useInteractionManager';
import { useSensor } from './useSensor';

export const useDrag = (options?: IUseDragOptions) => {
  const {
    elementRef,
    registerElement,
    unregisterElement,
    isDragging,
    isSelected,
  } = useElementManager(options);

  const { disableInteractions, enableInteractions } = useInteractionManager();

  const store = useDnDStore();

  const { activate, track, deactivate } = useSensor(elementRef);

  const handleDragStart = (event: PointerEvent) => {
    disableInteractions();

    activate(event);

    document.addEventListener('pointermove', handleDragMove);
    document.addEventListener('pointerup', handleDragEnd);
  };

  const handleDragMove = (event: PointerEvent) => {
    track(event);
  };

  const handleDragEnd = (event: PointerEvent) => {
    enableInteractions();

    deactivate(event);

    document.removeEventListener('pointermove', handleDragMove);
    document.removeEventListener('pointerup', handleDragEnd);
  };

  onMounted(registerElement);
  onBeforeUnmount(unregisterElement);

  return {
    pointerPosition: store.pointerPosition,
    elementRef,
    isDragging,
    isSelected,
    handleDragStart,
  };
};

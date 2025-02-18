import { markRaw, onBeforeUnmount, onMounted } from 'vue';

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
    isOvered,
  } = useElementManager(options);

  const { disableInteractions, enableInteractions } = useInteractionManager();

  const store = useDnDStore();

  const { activate, track, deactivate } = useSensor(elementRef);

  const handleDragStart = (event: PointerEvent) => {
    if (options?.container)
      store.activeContainer.component.value = markRaw(options.container);

    disableInteractions();

    activate(event);

    document.addEventListener('pointermove', handleDragMove);
    document.addEventListener('pointerup', handleDragEnd);
    document.addEventListener('wheel', handleScroll);
  };

  const handleDragMove = (event: PointerEvent) => {
    track(event);
  };

  const handleScroll = (event: WheelEvent) => {
    track(event);
  };

  const handleDragEnd = () => {
    store.activeContainer.component.value = null;
    store.activeContainer.ref.value = null;

    enableInteractions();

    deactivate();

    document.removeEventListener('pointermove', handleDragMove);
    document.removeEventListener('pointerup', handleDragEnd);
    document.removeEventListener('wheel', handleScroll);
  };

  onMounted(registerElement);
  onBeforeUnmount(unregisterElement);

  return {
    pointerPosition: store.pointerPosition,
    elementRef,
    isDragging,
    isSelected,
    isOvered,
    handleDragStart,
  };
};

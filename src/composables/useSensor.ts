import type { Ref } from 'vue';
import { useDnDStore } from './useDnDStore';
import { usePointer } from './usePointer';

export const useSensor = (elementRef: Ref<HTMLElement | null>) => {
  const store = useDnDStore();

  const { onPointerStart, onPointerMove, onPointerEnd } =
    usePointer(elementRef);

  const getDraggingElements = (draggableElement: HTMLElement | null) => {
    if (store.selectedElements.value.length) {
      return store.selectedElements.value;
    }

    const element = store.elements.value.find(
      (element) => element.node === draggableElement
    );

    return element ? [element] : [];
  };

  const activate = (event: PointerEvent) => {
    onPointerStart(event);

    store.isDragging.value = true;
    store.draggingElements.value = getDraggingElements(elementRef.value);
  };

  const track = (event: PointerEvent) => {
    onPointerMove(event);
  };

  const deactivate = (event: PointerEvent) => {
    onPointerEnd();

    store.isDragging.value = false;
    store.draggingElements.value = [];
  };

  return {
    activate,
    track,
    deactivate,
  };
};

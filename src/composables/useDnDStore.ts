import type {
  IBoundingBox,
  IDnDStore,
  IDragElement,
  IDraggingElement,
  IDropZone,
  IPoint,
} from '../types';
import { computed, effectScope, ref, type Component } from 'vue';

let initialized = false;
let state: IDnDStore;

export const useDnDStore = () => {
  if (!initialized) {
    const scope = effectScope(true);

    state = scope.run(() => ({
      isDragging: computed<boolean>(
        () => state.draggingElements.value.length > 0
      ),
      activeContainer: {
        component: ref<Component | null>(null),
        ref: ref<HTMLElement | null>(null),
      },
      elements: ref<IDragElement[]>([]),
      draggingElements: ref<IDraggingElement[]>([]),
      selectedElements: ref<IDragElement[]>([]),
      zones: ref<IDropZone[]>([]),

      hovered: {
        zone: ref<IDropZone | null>(null),
        element: ref<IDragElement | null>(null),
      },
      pointerPosition: {
        current: ref<IPoint | null>(null),
        start: ref<IPoint | null>(null),
        offset: {
          percent: ref<IPoint | null>(null),
          pixel: ref<IPoint | null>(null),
        },
      },
    }))!;

    initialized = true;
  }

  return state;
};

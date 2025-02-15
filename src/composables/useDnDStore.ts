import type { IDnDStore, IDragElement, IDropZone, IPoint } from '../types';
import { effectScope, ref } from 'vue';

let initialized = false;
let state: IDnDStore;

export const useDnDStore = () => {
  if (!initialized) {
    const scope = effectScope(true);

    state = scope.run(() => ({
      isDragging: ref<boolean>(false),
      activeContainerName: ref<string | null>(null),

      elements: ref<IDragElement[]>([]),
      draggingElements: ref<IDragElement[]>([]),
      selectedElements: ref<IDragElement[]>([]),
      zones: ref<IDropZone[]>([]),
      dragContainers: new Map(),

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

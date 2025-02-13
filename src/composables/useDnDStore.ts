import { effectScope, reactive } from 'vue';

import type { IDnDStore } from '../types';

let initialized = false;
let state: IDnDStore;

export const useDnDStore = () => {
  if (!initialized) {
    const scope = effectScope(true);

    state = scope.run(() =>
      reactive<IDnDStore>({
        isDragging: false,
        elements: [],
        draggingElements: [],
        selectedElements: [],
        zones: [],
        pointerPosition: undefined,
      })
    )!;

    initialized = true;
  }

  return state;
};

import type { IDnDStore, IDropZone, IElement } from '../types';
import { effectScope, onScopeDispose, reactive } from 'vue';

let initialized = false;
let state: IDnDStore;

export const useDnDStore = () => {
  if (!initialized) {
    const scope = effectScope(true);

    state = scope.run(() => {
      const store = reactive<IDnDStore>({
        isCtrlPressed: false,
        isShiftPressed: false,
        isAltPressed: false,

        isDragging: false,
        elements: new Map<string, IElement>(),
        draggingElements: new Map<string, IElement>(),
        selectedElements: new Map<string, IElement>(),
        zones: new Map<string, IDropZone>(),
        coordinates: undefined,
        hovered: {
          elementId: null,
          zoneId: null,
        },
        offset: {
          x: 0,
          y: 0,
          percentX: 0,
          percentY: 0,
        },
      });

      const onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            break;
          case 'Control':
            store.isCtrlPressed = true;
            break;
          case 'Shift':
            store.isShiftPressed = true;
            break;
          case 'Alt':
            store.isAltPressed = true;
            break;
        }
      };

      const onKeyUp = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Control':
            store.isCtrlPressed = false;
            break;
          case 'Shift':
            store.isShiftPressed = false;
            break;
          case 'Alt':
            store.isAltPressed = false;
            break;
        }
      };

      const onBlur = () => {
        store.isCtrlPressed = false;
        store.isShiftPressed = false;
        store.isAltPressed = false;
      };

      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
      window.addEventListener('blur', onBlur);

      // Cleanup event listeners when scope is destroyed
      onScopeDispose(() => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        window.removeEventListener('blur', onBlur);
      });

      return store;
    })!;

    initialized = true;
  }

  return state;
};

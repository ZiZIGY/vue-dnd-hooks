import { h, render } from 'vue';

import type { App } from 'vue';
import { DragOverlay } from './components/DragOverlay';
import { useAutoScroll } from './composables/useAutoScroll';
import { useBounding } from './composables/useBounding';
import { useDnDStore } from './composables/useDnDStore';
import { useDrag } from './composables/useDrag';
import { useDrop } from './composables/useDrop';
import { useElementSize } from './composables/useElementSize';
import { useGeometry } from './composables/useGeometry';
import { useSelectionManager } from './managers/useSelectionManager';

export const DnDKit = {
  install(app: App) {
    // Добавляем DragOverlay в body через DOM
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'vue-dnd-overlay';
    document.body.appendChild(overlayDiv);

    // Монтируем DragOverlay
    app.component('DragOverlay', DragOverlay);
    const dragOverlayVNode = h(DragOverlay);
    render(dragOverlayVNode, overlayDiv);
  },
};

export {
  DragOverlay,
  useDrag,
  useDrop,
  useAutoScroll,
  useDnDStore,
  useGeometry,
  useSelectionManager,
  useElementSize,
  useBounding,
};

export type {
  IDnDStore,
  IActiveContainer,
  IAutoScrollOptions,
  IBoundingBox,
  IDragElement,
  IDraggingElement,
  IDropZone,
  IGrid,
  IPoint,
  IPointerPosition,
  IUseDragContainerOptions,
  IUseDragOptions,
  IUseDropOptions,
} from './types';

export default DnDKit;

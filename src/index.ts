import DragOverlay from './components/DragOverlay.vue';
import { useAutoScroll } from './composables/useAutoScroll';
import { useBounding } from './composables/useBounding';
import { useDnDStore } from './composables/useDnDStore';
import { useDrag } from './composables/useDrag';
import { useDrop } from './composables/useDrop';
import { useElementSize } from './composables/useElementSize';
import { useGeometry } from './composables/useGeometry';
import { useSelectionManager } from './managers/useSelectionManager';

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

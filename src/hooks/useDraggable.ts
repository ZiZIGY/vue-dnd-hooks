import { DnDProvider, ICoordinates } from '@/types';
import { computed, onMounted, onUnmounted, ref, shallowReactive } from 'vue';
import { isGroupsCompatible, userSelect } from '@/utils';

import { useRect } from './useRect';

interface UseDraggableOptions<T> {
  context?: DnDProvider<T>;
  state?: any;
  group?: string | string[];
  hooks?: {
    onOver?: (context?: DnDProvider<T>, event?: PointerEvent) => void;
    onLeave?: (context?: DnDProvider<T>, event?: PointerEvent) => void;
    onStart?: (context?: DnDProvider<T>, event?: PointerEvent) => void;
    onMove?: (context?: DnDProvider<T>, event?: PointerEvent) => void;
    onEnd?: (context?: DnDProvider<T>, event?: PointerEvent) => void;
  };
}

interface IOffset extends ICoordinates {
  percentX: number;
  percentY: number;
}

interface IScroll extends ICoordinates {
  lastX: number;
  lastY: number;
}

/**
 * Hook for creating a draggable element
 * @template T - Type of data associated with the draggable element
 * @param {UseDraggableOptions<C>} options - Configuration options for the draggable element
 * @param {DnDProvider} [options.context] - DnD context for interaction with other elements
 * @param {C} [options.state] - Data associated with the draggable element
 * @param {Object} [options.hooks] - Event handlers
 * @param {Function} [options.hooks.onStart] - Called when dragging starts
 * @param {Function} [options.hooks.onMove] - Called when element is being dragged
 * @param {Function} [options.hooks.onOver] - Called when hovering over another element
 * @param {Function} [options.hooks.onLeave] - Called when leaving another element
 * @param {Function} [options.hooks.onEnd] - Called when dragging ends
 *
 * @returns {Object} Object containing refs and state
 * @property {Ref<HTMLElement | null>} elementRef - Ref for binding to DOM element
 * @property {Ref<boolean>} isDragging - Current dragging state
 * @property {ICoordinates} position - Current element position
 * @property {IOffset} offset - Offset from initial point
 * @property {ComputedRef<boolean>} isOver - Whether cursor is over the element
 * @property {Ref<ElementRect | null>} initialRect - Initial size and position
 * @property {Ref<ElementRect | null>} currentRect - Current size and position
 *
 * @example
 * ```typescript
 * interface ItemData {
 *   id: string;
 *   title: string;
 * }
 *
 * const { elementRef, isDragging } = useDraggable<ItemData>({
 *   data: { id: '1', title: 'Item' },
 *   hooks: {
 *     onStart: (context) => console.log('Started dragging'),
 *     onEnd: (context) => console.log('Ended dragging')
 *   }
 * });
 * ```
 */
export const useDraggable = <C>(options?: UseDraggableOptions<C>) => {
  const elementRef = ref<HTMLElement | null>(null);
  const isDragging = ref<boolean>(false);

  const position = shallowReactive<ICoordinates>({
    x: 0,
    y: 0,
  });

  const offset = shallowReactive<IOffset>({
    x: 0,
    y: 0,
    percentX: 0,
    percentY: 0,
  });

  const isOver = computed(
    () => options?.context?.hoveredElement?.node === elementRef.value
  );

  const { currentRect, initialRect } = useRect(elementRef);

  const scroll: IScroll = {
    x: window.scrollX,
    y: window.scrollY,
    lastX: window.scrollX,
    lastY: window.scrollY,
  };

  const dragScroll = () => {
    const dx = window.scrollX - scroll.lastX;
    const dy = window.scrollY - scroll.lastY;

    position.x += dx;
    position.y += dy;

    scroll.lastX = window.scrollX;
    scroll.lastY = window.scrollY;
  };

  const dragCancel = (event: KeyboardEvent) => {
    event.stopPropagation();

    if (!elementRef.value) return;

    if (event.key === 'Escape') {
      isDragging.value = false;

      elementRef.value.removeAttribute('data-pressed');
      elementRef.value.removeAttribute('aria-pressed');
    }

    document.removeEventListener('pointermove', dragMove);
    document.removeEventListener('pointerup', dragEnd);
    document.removeEventListener('wheel', dragScroll);
    document.removeEventListener('scroll', dragScroll);
    document.removeEventListener('keypress', dragCancel);

    if (options?.context) {
      options.context.isDragging = isDragging.value;

      options.context.hoveredElement?.node?.removeAttribute('data-hovered');

      options.context.draggingElement = null;
      options.context.hoveredElement = null;
    }

    options?.hooks?.onEnd?.(options?.context);

    elementRef.value.addEventListener('pointerover', dragOver);
    elementRef.value.addEventListener('pointerleave', dragLeave);
  };

  const dragStart = (event: PointerEvent) => {
    if (!elementRef.value) return;

    event.stopPropagation();

    isDragging.value = true;

    userSelect.disable();

    offset.x = event.pageX - (currentRect.value?.left || 0);
    offset.y = event.pageY - (currentRect.value?.top || 0);

    offset.percentX = (offset.x / (currentRect.value?.width || 0)) * 100;
    offset.percentY = (offset.y / (currentRect.value?.height || 0)) * 100;

    position.x = event.pageX;
    position.y = event.pageY;

    if (options?.context) {
      options.context.isDragging = isDragging.value;

      options.context.draggingElement = {
        node: elementRef.value,
        state: options.state,
        group: options.group,
      };
    }
    options?.hooks?.onStart?.(options?.context, event);

    elementRef.value.setAttribute('data-pressed', 'true');
    elementRef.value.setAttribute('aria-pressed', 'true');

    document.addEventListener('pointermove', dragMove);
    document.addEventListener('pointerup', dragEnd);
    document.addEventListener('scroll', dragScroll);
    document.addEventListener('keydown', dragCancel);

    elementRef.value.removeEventListener('pointerover', dragOver);
    elementRef.value.removeEventListener('pointerleave', dragLeave);
  };

  const dragMove = (event: PointerEvent) => {
    if (!elementRef.value) return;

    event.stopPropagation();

    position.x = event.pageX;
    position.y = event.pageY;

    options?.hooks?.onMove?.(options?.context, event);
  };

  const dragOver = (event: PointerEvent) => {
    event.stopPropagation();
    if (options?.context?.draggingElement?.node?.contains(event.target as Node))
      return;

    if (
      !options?.context?.isDragging &&
      options?.context?.draggingElement?.node !== elementRef.value
    )
      return;

    console.log('hover');

    if (
      !isGroupsCompatible(
        options?.context?.draggingElement?.group,
        options?.group
      )
    )
      return;

    options.context.hoveredElement = {
      node: elementRef.value,
      state: options.state,
    };

    options?.hooks?.onOver?.(options?.context, event);

    elementRef.value?.setAttribute('data-hovered', 'true');
  };

  const dragLeave = (event: PointerEvent) => {
    event.stopPropagation();

    if (options?.context?.draggingElement?.node?.contains(event.target as Node))
      return;

    if (
      !options?.context?.isDragging &&
      options?.context?.draggingElement?.node !== elementRef.value
    )
      return;

    options?.hooks?.onLeave?.(options?.context, event);

    options.context.hoveredElement = null;
    elementRef.value?.removeAttribute('data-hovered');
  };

  const dragEnd = (event: PointerEvent) => {
    if (!elementRef.value) return;

    event.stopPropagation();

    isDragging.value = false;

    position.x = event.pageX;
    position.y = event.pageY;

    if (options?.context) {
      options.context.isDragging = isDragging.value;

      options.context.hoveredElement?.node?.removeAttribute('data-hovered');

      if (options.hooks?.onEnd) {
        options.hooks.onEnd(options.context, event);
      } else options.context.hooks?.onEnd?.(options.context, event);

      options.context.draggingElement = null;
      options.context.hoveredElement = null;
    }

    elementRef.value.removeAttribute('data-pressed');
    elementRef.value.removeAttribute('aria-pressed');

    document.removeEventListener('pointermove', dragMove);
    document.removeEventListener('pointerup', dragEnd);
    document.removeEventListener('scroll', dragScroll);

    elementRef.value.addEventListener('pointerover', dragOver);
    elementRef.value.addEventListener('pointerleave', dragLeave);
  };

  onMounted(() => {
    if (!elementRef.value) return;

    elementRef.value.setAttribute('data-dnd-entity', 'true');
    elementRef.value.setAttribute('aria-grabbed', 'true');

    elementRef.value.addEventListener('pointerover', dragOver);
    elementRef.value.addEventListener('pointerleave', dragLeave);
    elementRef.value.addEventListener('pointerdown', dragStart);
  });

  onUnmounted(() => {
    document.removeEventListener('pointermove', dragMove);
    document.removeEventListener('pointerup', dragEnd);
  });

  return {
    elementRef,
    isDragging,
    position,
    offset,
    isOver,
    initialRect,
    currentRect,
  };
};

import { IUseDragOptions } from "../types";
/**
 * Main hook for making elements draggable.
 * Provides all necessary functionality for drag and drop operations.
 *
 * @param options - Configuration options for draggable element
 * @param options.groups - Groups that element belongs to (for drop zone filtering)
 * @param options.events - Event handlers for drag lifecycle
 * @param options.data - Custom data to be passed to event handlers
 * @param options.layer - Custom component to render while dragging
 * @param options.container - Parent container component reference
 *
 * @returns Object containing:
 * - elementRef: Reference to be bound to draggable element
 * - isDragging: Whether element is currently being dragged
 * - isOvered: Whether element is being hovered by dragged element
 * - isAllowed: Whether element can interact with current drop zone based on group matching
 * - pointerPosition: Current pointer coordinates
 * - handleDragStart: Function to initiate drag operation
 *
 * @example
 * ```vue
 * <template>
 *   <div
 *     ref="elementRef"
 *     :class="{ 'dragging': isDragging }"
 *     @pointerdown="handleDragStart"
 *   >
 *     Drag me!
 *   </div>
 * </template>
 *
 * <script setup lang="ts">
 * const { elementRef, isDragging, handleDragStart } = useDrag({
 *   groups: ['items'],
 *   events: {
 *     onEnd: (store) => console.log('Drag ended!'),
 *   }
 * });
 * </script>
 * ```
 */
export declare const useDrag: (options?: IUseDragOptions) => {
    pointerPosition: import('..').IPointerPosition;
    elementRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
    isDragging: import('vue').ComputedRef<boolean>;
    isOvered: import('vue').ComputedRef<boolean>;
    isAllowed: import('vue').ComputedRef<boolean>;
    handleDragStart: (event: PointerEvent) => void;
};

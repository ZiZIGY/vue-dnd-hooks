import { markRaw, onBeforeUnmount, onMounted } from 'vue';
import { useDnDStore } from './useDnDStore';
import { useElementManager } from '../managers/useElementManager';
import { useInteractionManager } from '../managers/useInteractionManager';
import { useSensor } from './useSensor';
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
export const useDrag = (options) => {
    const { elementRef, registerElement, unregisterElement, isDragging, isOvered, isAllowed, } = useElementManager(options);
    const { disableInteractions, enableInteractions } = useInteractionManager();
    const store = useDnDStore();
    const { activate, track, deactivate } = useSensor(elementRef);
    /**
     * Initiates drag operation.
     * Sets up event listeners and updates store state.
     */
    const handleDragStart = (event) => {
        if (options?.container)
            store.activeContainer.component.value = markRaw(options.container);
        disableInteractions();
        activate(event);
        document.addEventListener('pointermove', handleDragMove);
        document.addEventListener('pointerup', handleDragEnd);
        document.addEventListener('wheel', handleScroll);
    };
    /**
     * Updates drag position on pointer move
     */
    const handleDragMove = (event) => {
        track(event);
    };
    /**
     * Updates drag position on scroll
     */
    const handleScroll = (event) => {
        track(event);
    };
    /**
     * Ends drag operation.
     * Cleans up event listeners and resets store state.
     */
    const handleDragEnd = () => {
        store.activeContainer.component.value = null;
        enableInteractions();
        deactivate();
        document.removeEventListener('pointermove', handleDragMove);
        document.removeEventListener('pointerup', handleDragEnd);
        document.removeEventListener('wheel', handleScroll);
    };
    // Register/unregister element with store
    onMounted(registerElement);
    onBeforeUnmount(unregisterElement);
    return {
        pointerPosition: store.pointerPosition,
        elementRef,
        isDragging,
        isOvered,
        isAllowed,
        handleDragStart,
    };
};

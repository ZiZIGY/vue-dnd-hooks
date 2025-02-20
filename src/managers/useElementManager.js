import { computed, ref } from 'vue';
import { draggableDataName } from '../utils/namespaces';
import { useDnDStore } from '../composables/useDnDStore';
/**
 * Hook for managing draggable elements and their interactions.
 * Provides methods for registering, unregistering elements,
 * checking if an element is being dragged, and determining if it can be dropped.
 *
 * @param options - Optional configuration object for element management
 * @returns Object containing element management state and methods
 */
export const useElementManager = (options) => {
    const { elements, draggingElements, hovered, isDragging: isDragStarted, } = useDnDStore();
    /** Reference to the element being managed */
    const elementRef = ref(null);
    /** Whether the element is currently hovered over */
    const isOvered = computed(() => hovered.element.value?.node === elementRef.value);
    /** Whether the element is currently being dragged */
    const isDragging = computed(() => draggingElements.value.some((element) => element.node === elementRef.value));
    /** Whether element can interact with current drop zone based on group matching */
    const isAllowed = computed(() => {
        if (!elementRef.value)
            return false;
        if (!isDragStarted.value)
            return false;
        const currentElement = elements.value.find((element) => element.node === elementRef.value);
        if (!currentElement?.groups.length)
            return true;
        return !draggingElements.value.some((element) => {
            if (!element.groups.length)
                return false;
            return !element.groups.some((group) => currentElement.groups.includes(group));
        });
    });
    /** Registers the element with the manager */
    const registerElement = () => {
        if (!elementRef.value)
            throw new Error('ElementRef is not set');
        elements.value.push({
            node: elementRef.value,
            groups: options?.groups ?? [],
            layer: options?.layer ?? null,
            defaultLayer: options?.layer ?? null,
            events: options?.events ?? {},
            data: options?.data ?? undefined,
        });
        elementRef.value.setAttribute(draggableDataName, 'true');
    };
    /** Unregister the element from the manager */
    const unregisterElement = () => {
        const index = elements.value.findIndex((element) => element.node === elementRef.value);
        if (index !== -1)
            elements.value.splice(index, 1);
    };
    return {
        elementRef,
        registerElement,
        unregisterElement,
        isDragging,
        isOvered,
        isAllowed,
    };
};

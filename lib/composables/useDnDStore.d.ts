import { IDnDStore } from "../types";
/**
 * Global store for managing drag and drop state.
 * Uses singleton pattern to ensure single source of truth across the application.
 *
 * The store manages:
 * - Active drag operations
 * - Dragged elements
 * - Drop zones
 * - Pointer positions
 * - Hover states
 *
 * @returns {IDnDStore} Global drag and drop state
 *
 * @example
 * ```ts
 * const {
 *   // Drag state
 *   isDragging,          // Whether drag operation is active
 *   draggingElements,    // Currently dragged elements
 *   selectedElements,    // Selected elements (for multi-drag)
 *
 *   // Container state
 *   activeContainer,     // Current drag container
 *
 *   // Elements and zones
 *   elements,            // All registered draggable elements
 *   zones,              // All registered drop zones
 *
 *   // Hover state
 *   hovered: {
 *     zone,             // Currently hovered drop zone
 *     element           // Currently hovered element
 *   },
 *
 *   // Pointer tracking
 *   pointerPosition: {
 *     current,          // Current pointer coordinates
 *     start,           // Initial drag start coordinates
 *     offset: {
 *       percent,       // Offset as percentage
 *       pixel         // Offset in pixels
 *     }
 *   }
 * } = useDnDStore();
 *
 * // Example: Watch for drag state changes
 * watch(isDragging, (dragging) => {
 *   if (dragging) {
 *     console.log('Drag started with elements:', draggingElements.value);
 *   } else {
 *     console.log('Drag ended');
 *   }
 * });
 *
 * // Example: Track hover states
 * watch(() => hovered.zone.value, (zone) => {
 *   if (zone) {
 *     console.log('Hovering over zone:', zone.data);
 *   }
 * });
 * ```
 */
export declare const useDnDStore: () => IDnDStore;

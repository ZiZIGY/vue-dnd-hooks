import { IAutoScrollOptions, IPoint } from "../types";
import { Ref } from 'vue';
/**
 * Hook for automatic scrolling when pointer approaches container edges.
 * Universal utility that can be used for any pointer-based interactions,
 * not limited to drag and drop operations.
 *
 * @param container - Reference to the scrollable container element
 * @param point - Reference to the current pointer position
 * @param options - Auto-scroll configuration options
 * @returns Object containing scroll state
 *
 * @example
 * ```ts
 * // Basic usage
 * const container = ref<HTMLElement | null>(null);
 * const point = ref<IPoint | null>(null);
 * const { isScrolling } = useAutoScroll(container, point);
 *
 * // With custom options
 * const options = {
 *   threshold: 100, // Start scrolling 100px from edges
 *   speed: 15,     // Scroll 15px per frame
 *   disabled: false // Enable/disable scrolling
 * };
 * const { isScrolling } = useAutoScroll(container, point, options);
 * ```
 */
export declare const useAutoScroll: (container: Ref<HTMLElement | null>, point: Ref<IPoint | null>, options?: IAutoScrollOptions) => {
    isScrolling: Ref<boolean, boolean>;
};

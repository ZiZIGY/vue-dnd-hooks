import { Ref } from 'vue';
import { IPoint } from "../types";
/**
 * Hook for calculating geometric relationships between two points.
 * Independent utility that can be used for any geometric calculations,
 * commonly used in drag and drop but not limited to it.
 *
 * @param pointA - Reference to the first point coordinates
 * @param pointB - Reference to the second point coordinates
 * @returns Object containing geometric calculations:
 * - delta: difference between points
 * - direction: cardinal direction from pointA to pointB
 * - distance: euclidean distance between points
 * - angle: angle in degrees between points
 *
 * @example
 * ```ts
 * const start = ref<IPoint>({ x: 0, y: 0 });
 * const end = ref<IPoint>({ x: 100, y: 100 });
 * const { delta, direction, distance, angle } = useGeometry(start, end);
 * ```
 */
export declare const useGeometry: (pointA: Ref<IPoint | null>, pointB: Ref<IPoint | null>) => {
    delta: import('vue').ComputedRef<{
        x: number;
        y: number;
    }>;
    direction: import('vue').ComputedRef<"left" | "right" | "up" | "down">;
    distance: import('vue').ComputedRef<number>;
    angle: import('vue').ComputedRef<number>;
};

import { Ref } from 'vue';
export interface ElementSize {
    width: number;
    height: number;
}
/**
 * Отслеживает изменения размеров элемента
 */
export declare function useElementSize(element: Ref<HTMLElement | null>, initialSize?: ElementSize): {
    width: import('vue').ShallowRef<number, number>;
    height: import('vue').ShallowRef<number, number>;
};

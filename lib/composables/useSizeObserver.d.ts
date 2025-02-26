import { Ref } from 'vue';
export interface UseSizeObserverOptions {
    /**
     * Немедленно вызвать callback при монтировании
     * @default true
     */
    immediate?: boolean;
}
/**
 * Наблюдает за изменениями размеров элемента
 * @param element - Элемент для наблюдения
 * @param callback - Функция, вызываемая при изменении размеров
 * @param options - Опции наблюдателя
 */
export declare function useSizeObserver(element: Ref<HTMLElement | null>, callback: (entry: ResizeObserverEntry) => void, options?: UseSizeObserverOptions): () => void;

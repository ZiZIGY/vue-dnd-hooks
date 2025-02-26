import { Ref } from 'vue';
import { IBoundingBox } from "../types";
interface UseBoundingOptions {
    reset?: boolean;
    windowResize?: boolean;
    windowScroll?: boolean;
    immediate?: boolean;
}
export declare const useBounding: (element: Ref<HTMLElement | null>, options?: UseBoundingOptions) => import('vue').ShallowRef<IBoundingBox, IBoundingBox>;
export {};

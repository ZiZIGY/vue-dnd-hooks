import { Ref } from 'vue';
export declare const useSensor: (elementRef: Ref<HTMLElement | null>) => {
    activate: (event: PointerEvent) => void;
    track: (event: PointerEvent | WheelEvent) => void;
    deactivate: () => void;
};

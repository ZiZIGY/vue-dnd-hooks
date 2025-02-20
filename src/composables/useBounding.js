import { onBeforeUnmount, shallowRef, watch } from 'vue';
import { getBoundingBox } from '../utils/geometry';
export const useBounding = (element, options = {}) => {
    const { reset = true, windowResize = true, windowScroll = true } = options;
    const rect = shallowRef({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    });
    // Observers
    const observers = {
        resize: null,
        mutation: null,
    };
    // Update logic
    const update = () => {
        if (!element.value) {
            if (reset)
                rect.value = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                };
            return;
        }
        rect.value = getBoundingBox(element.value);
    };
    // Cleanup function
    const cleanup = () => {
        observers.resize?.disconnect();
        observers.mutation?.disconnect();
        observers.resize = null;
        observers.mutation = null;
    };
    // Setup observers
    const setupObservers = () => {
        if (!element.value)
            return;
        cleanup();
        observers.resize = new ResizeObserver(update);
        observers.resize.observe(element.value);
        observers.mutation = new MutationObserver(update);
        observers.mutation.observe(element.value, {
            attributes: true,
            attributeFilter: ['style', 'class'],
            characterData: false,
            childList: false,
            subtree: false,
        });
        update();
    };
    // Event listeners
    const setupEventListeners = () => {
        if (windowScroll) {
            window.addEventListener('scroll', update, {
                capture: true,
                passive: true,
            });
        }
        if (windowResize) {
            window.addEventListener('resize', update, { passive: true });
        }
    };
    const cleanupEventListeners = () => {
        if (windowScroll)
            window.removeEventListener('scroll', update);
        if (windowResize)
            window.removeEventListener('resize', update);
    };
    // Watch element changes
    watch(() => element.value, (newElement, oldElement) => {
        if (oldElement !== newElement) {
            if (!newElement && reset) {
                rect.value = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                };
            }
            setupObservers();
        }
    }, { immediate: true });
    // Setup and cleanup
    setupEventListeners();
    onBeforeUnmount(() => {
        cleanup();
        cleanupEventListeners();
    });
    return rect;
};

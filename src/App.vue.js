/// <reference types="../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { useDrag } from './composables/useDrag';
const { elementRef, handleDragStart } = useDrag();
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onPointerdown: (__VLS_ctx.handleDragStart) },
        ref: ("elementRef"),
    });
    // @ts-ignore navigation for `const elementRef = ref()`
    /** @type { typeof __VLS_ctx.elementRef } */ ;
    const __VLS_0 = {}.DragOverlay;
    /** @type { [typeof __VLS_components.DragOverlay, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {
        'elementRef': __VLS_nativeElements['div'],
    };
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            elementRef: elementRef,
            handleDragStart: handleDragStart,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeRefs: {},
});
; /* PartiallyEnd: #4569/main.vue */

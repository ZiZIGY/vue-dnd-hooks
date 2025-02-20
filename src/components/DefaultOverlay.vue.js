/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { computed } from 'vue';
import { useDragContainer } from '../composables/useDragContainer';
const { elementRef, pointerPosition, isDragging, draggingElements } = useDragContainer();
const computedStyle = computed(() => ({
    transform: `translate3d(${(pointerPosition.current.value?.x ?? 0) -
        (pointerPosition.offset.pixel.value?.x ?? 0)}px, ${(pointerPosition.current.value?.y ?? 0) -
        (pointerPosition.offset.pixel.value?.y ?? 0)}px, 0)`,
}));
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.Teleport;
    /** @type { [typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("body"),
    }));
    const __VLS_2 = __VLS_1({
        to: ("body"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    if (__VLS_ctx.isDragging) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ref: ("elementRef"),
            ...{ style: ((__VLS_ctx.computedStyle)) },
            ...{ class: ("default-drag-overlay") },
        });
        // @ts-ignore navigation for `const elementRef = ref()`
        /** @type { typeof __VLS_ctx.elementRef } */ ;
        for (const [element, index] of __VLS_getVForSourceType((__VLS_ctx.draggingElements))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div)({
                key: ((index)),
                ...{ style: (({
                        width: `${element.initialRect?.width}px`,
                        height: `${element.initialRect?.height}px`,
                    })) },
            });
            __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (element.initialHTML) }, null, null);
        }
    }
    __VLS_5.slots.default;
    var __VLS_5;
    ['default-drag-overlay',];
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
            isDragging: isDragging,
            draggingElements: draggingElements,
            computedStyle: computedStyle,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeRefs: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */

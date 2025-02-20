import { computed, defineComponent, h } from 'vue';

import DefaultOverlay from './DefaultOverlay.vue';
import { useDnDStore } from '../composables/useDnDStore';

export const DragOverlay = defineComponent({
  name: 'DragOverlay',

  setup() {
    const { activeContainer } = useDnDStore();

    const overlay = computed(
      () => activeContainer.component.value ?? DefaultOverlay
    );

    return () => h(overlay.value);
  },
});

export default DragOverlay;

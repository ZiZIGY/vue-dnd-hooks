<script setup lang="ts">
  import { ref } from 'vue';
  import DragOverlay from './components/DragOverlay.vue';
  import Draggable from './components/examples/Draggable.vue';
  import Droppable from './components/examples/Droppable.vue';
  import VueLogo from './components/examples/VueLogo.vue';

  const handleDrop = () => (elementInDropZone.value = true);

  const handleEnd = () => (elementInDropZone.value = false);

  const elementInDropZone = ref<boolean>(false);
</script>

<template>
  <div>
    <Draggable v-if="!elementInDropZone"> drag me </Draggable>
    <Droppable @drop="handleDrop">
      <Draggable
        v-if="elementInDropZone"
        @end="handleEnd"
      >
        im in drop zone
      </Draggable>
    </Droppable>

    <DragOverlay />
    <vueLogo />
  </div>
</template>

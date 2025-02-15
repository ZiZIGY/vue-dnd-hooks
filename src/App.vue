<script setup lang="ts">
  import DragContainer from './components/DragContainer.vue';
  import BaseContainer from './components/BaseContainer.vue';

  import { useDragContainerManager } from './managers/useDragContainerManager';

  import Draggable from './components/Draggable.vue';
  import DropZone from './components/DropZone.vue';
  import { useDnDStore } from './composables/useDnDStore';

  const store = useDnDStore();

  const { registerContainer } = useDragContainerManager();

  registerContainer('base', BaseContainer);
</script>

<template>
  <pre ref="preRef">{{ store }}</pre>
  <DropZone>
    <Draggable />
  </DropZone>

  <DropZone class="test"> drop in me </DropZone>

  <DragContainer />
</template>

<style>
  pre {
    position: fixed;
    left: 0;
    top: 0;
    margin: auto;
    bottom: 0;
    width: min-content;
    height: 50vh;
    overflow: auto;
  }
  body {
    height: 3000px;
  }

  .test {
    padding: 20px;
    margin-top: 100px;
    border: 1px dashed red;
  }
</style>

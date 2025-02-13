<script setup lang="ts">
  import Draggable from './components/Draggable.vue';
  import DropZone from './components/DropZone.vue';
  import { useDnDStore } from './composables/useDnDStore';

  const store = useDnDStore();
</script>

<template>
  <pre>{{ store }}</pre>
  <DropZone>
    <Draggable />
  </DropZone>
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
</style>

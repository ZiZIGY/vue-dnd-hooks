<script setup lang="ts">
  import DragContainer from './components/DragOverlay.vue';

  import Draggable from './components/Draggable.vue';
  import DropZone from './components/DropZone.vue';
</script>

<template>
  <Draggable
    class="hehe"
    :groups="['zone1']"
  />
  <Draggable :groups="['zone1']" />

  <DropZone>test zone</DropZone>
  <DropZone>test zone</DropZone>

  <DragContainer />
</template>

<style>
  pre {
    position: fixed;
    left: 0;
    top: 0;
    margin: auto;
    bottom: 0;
    margin: auto;
    height: 300px;
    width: min-content;

    overflow: auto;
  }
  body {
    height: 3000px;
  }

  .test {
    padding: 20px;
    border: 1px dashed red;
  }
</style>

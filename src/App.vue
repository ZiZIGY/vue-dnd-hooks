<script setup lang="ts">
  import DragContainer from './components/DragOverlay.vue';

  import Draggable from './components/Draggable.vue';
  import DropZone from './components/DropZone.vue';
  import { useDnDStore } from './composables/useDnDStore';

  const store = useDnDStore();
</script>

<template>
  <pre>{{ store.hovered }}</pre>
  <Draggable>
    <DropZone class="test"> nested zone </DropZone>
  </Draggable>
  <Draggable></Draggable>

  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <DropZone class="test">
    <div>drop in me</div>
    <DropZone class="test test2"> drop in me 2 </DropZone>
  </DropZone>

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
    border: 1px dashed red;
  }
</style>

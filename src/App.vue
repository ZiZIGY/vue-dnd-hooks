<script setup lang="ts">
  import DragContainer from './components/DragOverlay.vue';

  import Draggable from './components/Draggable.vue';
</script>

<template>
  <Draggable class="hehe"></Draggable>

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

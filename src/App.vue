<script setup lang="ts">
  import Kanban from './components/examples/Kanban.vue';
  import { useDnDStore } from './hooks/useDnDStore';

  const store = useDnDStore();
</script>

<template>
  <Kanban />
  <div
    v-if="store.isDragging"
    class="draggable-container"
    :style="{
      left: store.coordinates?.x + 'px',
      top: store.coordinates?.y + 'px',
    }"
  >
  </div>
  <pre>
    {{ store }}
  </pre>
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
  .kanban-container {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }
  .kanban-container-move,
  .kanban-container-enter-active,
  .kanban-container-leave-active {
    transition: all 0.3s ease;
  }

  .kanban-container-enter-from,
  .kanban-container-leave-to {
    opacity: 0;
  }

  .draggable-container {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
  }
</style>

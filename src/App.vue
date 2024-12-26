<script setup>
  import { useDraggable } from '@/hooks/useDraggable';
  import { useDroppable } from '@/hooks/useDroppable';
  import { onMounted, ref } from 'vue';
  import DnDProvider from './components/DnDProvider.vue';
  import Draggable from './components/Draggable.vue';
  import { useRect } from './hooks/useRect';
  import Droppable from './components/Droppable.vue';

  const element = ref();
</script>

<template>
  <DnDProvider>
    <Draggable hide-on-drag>123123123</Draggable>
    <Droppable class="drop-zone">
      <div> drop zone </div>
      <Droppable class="drop-zone">
        <div> drop zone 2</div>
      </Droppable>
    </Droppable>
  </DnDProvider>
</template>

<style>
  .test {
    overflow: scroll;
    resize: both;
    display: block;
  }
  .drop-zone {
    padding: 20px;
    border: 1px dashed #000;
  }
</style>

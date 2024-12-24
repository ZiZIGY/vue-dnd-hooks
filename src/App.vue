<template>
  <DnDProvider>
    <Draggable>123123123</Draggable>
  </DnDProvider>
</template>

<script setup>
  import { useDraggable } from '@/hooks/useDraggable';
  import { useDroppable } from '@/hooks/useDroppable';
  import { onMounted } from 'vue';
  import DnDProvider from './components/DnDProvider.vue';
  import Draggable from './components/Draggable.vue';
  const {
    elementRef: draggableElement,
    position,
    isDragging,
    offset,
  } = useDraggable({
    id: 'draggable',
  });

  const { containerRef, isOver, checkOverlap, handleDrop } = useDroppable({
    onDrop: (event) => {
      console.log('Dropped into container!', event);
    },
  });

  const checkOverlapOnMove = (event) => {
    if (isDragging.value) {
      checkOverlap(event.pageX, event.pageY);
    }
  };

  const handleDropOnRelease = (event) => {
    if (isDragging.value) {
      handleDrop(event);
    }
  };

  onMounted(() => {
    document.addEventListener('pointermove', checkOverlapOnMove);
  });
</script>

<style>
  .draggable {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: lightblue;
    cursor: grab;
  }

  .droppable-container {
    width: 200px;
    height: 200px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
  }

  .droppable-container.over {
    border-color: green;
    background-color: rgba(0, 255, 0, 0.1);
  }
</style>

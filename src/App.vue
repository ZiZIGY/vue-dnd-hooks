<script setup>
  import { useDraggable } from '@/hooks/useDraggable';
  import { useDroppable } from '@/hooks/useDroppable';
  import { onMounted, ref } from 'vue';
  import DnDProvider from './components/DnDProvider.vue';
  import Draggable from './components/Draggable.vue';
  import { useRect } from './hooks/useRect';
  import Droppable from './components/Droppable.vue';
  import Skeleton from './components/Skeleton.vue';

  const parent = ref(null);

  const handleDragEnd = (context) => {
    console.log('context', context.overElement);
    if (context.overElement) {
      parent.value = context.overElement;
    } else {
      parent.value = null;
    }
  };
</script>

<template>
  <DnDProvider @drag-end="handleDragEnd">
    <Draggable
      v-if="parent === null"
      :id="123"
      @drag-end="handleDragEnd"
    >
      123123123
    </Draggable>
    <Droppable
      class="drop-zone"
      :id="1"
    >
      <div> drop zone </div>
      <Draggable
        :id="123"
        v-if="parent?.id == '1'"
      >
        <Skeleton></Skeleton>
      </Draggable>
      <Droppable
        :id="2"
        class="drop-zone"
      >
        <div> drop zone </div>
        <Draggable
          :id="123"
          v-if="parent?.id == '2'"
        >
          kek
        </Draggable>
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

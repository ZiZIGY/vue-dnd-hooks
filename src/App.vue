<script setup lang="ts">
  import { ref } from 'vue';
  import DragContainer from './components/DragOverlay.vue';

  import Draggable from './components/Draggable.vue';
  import DropZone from './components/DropZone.vue';
  import { useDnDStore } from './composables/useDnDStore';

  const items = ref([
    {
      id: 1,
      children: [
        {
          id: 2,
          children: [
            {
              id: 3,
              children: [],
            },
          ],
        },
        {
          id: 4,
          children: [],
        },
      ],
    },
  ]);
</script>

<template>
  <DropZone>
    <Draggable
      v-for="item in items"
      :key="item.id"
    >
      <div>{{ item.id }}</div>
      <DropZone>
        <Draggable
          v-for="child in item.children"
          :key="child.id"
        >
          <div>{{ child.id }}</div>
        </Draggable>
      </DropZone>
    </Draggable>
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
    margin: auto;
    height: 300px;
    width: min-content;

    overflow: auto;
  }
  body {
    height: 3000px;
  }
</style>

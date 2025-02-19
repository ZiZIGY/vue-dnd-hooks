<script setup lang="ts">
  import { ref } from 'vue';
  import DragContainer from './components/DragOverlay.vue';

  import Draggable from './components/Draggable.vue';
  import DropZone from './components/DropZone.vue';
  import { useDnDStore } from './composables/useDnDStore';

  const store = useDnDStore();

  const pre = ref<HTMLElement | null>(null);
</script>

<template>
  <Draggable class="hehe"> </Draggable>
  <pre
    ref="pre"
    :style="{
      display: 'block',
      resize: 'both',
    }"
  >
    {{ store }}
  </pre>

  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <DropZone class="test">
    <div>drop in me</div>
    <DropZone class="test test2">
      drop in me 2
      <DropZone class="test test3">
        drop in me 3
        <DropZone class="test test4"> drop in me 4 </DropZone>
      </DropZone>
    </DropZone>
  </DropZone>

  <DropZone class="test">
    <div>drop in me</div>
  </DropZone>
  <Draggable> </Draggable>
  <DropZone class="test">
    <div>drop in me</div>
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
    height: 20vh;
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

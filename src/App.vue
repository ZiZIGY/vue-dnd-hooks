<script setup lang="ts">
  import { useDrag } from './composables/useDrag';

  const { elementRef, handleDragStart } = useDrag();
</script>

<template>
  <div
    ref="elementRef"
    @pointerdown="handleDragStart"
  >
    123123
  </div>
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

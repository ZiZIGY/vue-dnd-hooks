<script setup lang="ts">
  import { useDrag } from '../composables/useDrag';

  const { elementRef, handleDragStart } = useDrag();
</script>

<template>
  <div
    ref="elementRef"
    @pointerdown="handleDragStart"
  >
    drag me
    <slot />
  </div>
</template>

<style scoped>
  div {
    user-select: none;
    touch-action: none;
  }
</style>

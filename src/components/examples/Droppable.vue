<script setup lang="ts">
  import { useDrop } from '../../composables/useDrop';

  const emit = defineEmits<{
    (e: 'drop'): void;
  }>();

  const { elementRef, isOvered } = useDrop({
    events: { onDrop: () => emit('drop') },
  });
</script>

<template>
  <div
    ref="elementRef"
    :class="{
      droppable: true,
      'is-overed': isOvered,
    }"
  >
    drop here
    <slot />
  </div>
</template>

<style scoped>
  .droppable {
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }
  .is-overed {
    background-color: #f0f0f0;
    border: 1px dashed red;
  }
</style>

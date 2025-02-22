<script setup lang="ts">
  import { useDrag } from '../../composables/useDrag';

  const emit = defineEmits<{
    (e: 'end'): void;
  }>();

  const { elementRef, handleDragStart, isDragging } = useDrag({
    events: { onEnd: () => emit('end') },
  });
</script>

<template>
  <div
    ref="elementRef"
    @pointerdown="handleDragStart"
    :class="{ dragging: isDragging }"
  >
    <slot />
  </div>
</template>

<style scoped>
  .dragging {
    opacity: 0.5;
  }
</style>

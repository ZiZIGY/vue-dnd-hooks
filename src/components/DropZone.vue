<script setup lang="ts" generic="T">
  import { useDrop } from '@/hooks/useDrop';
  import type { IDnDStore } from '@/types';

  const props = defineProps<{
    group: string[];
    items?: any[];
    state?: T;
  }>();

  const emit = defineEmits<{
    (e: 'drop', event: IDnDStore, state?: any): void;
  }>();

  const { elementRef, isOvered, isNotAllowed } = useDrop({
    group: props.group,
    state: props.state,
    events: {
      onDrop: (store, state) => emit('drop', store, state),
    },
  });
</script>

<template>
  <div
    ref="elementRef"
    class="dnd-drop-zone"
    :style="{
      border: isOvered && !isNotAllowed ? '1px solid #000' : 'none',
      opacity: isNotAllowed ? 0.5 : 1,
      pointerEvents: isNotAllowed ? 'none' : 'auto',
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
  .dnd-drop-zone {
    padding: 1rem;
  }
</style>

<script lang="ts" setup>
  import { useDnDContext } from '@/hooks/useDnDContext';
  import { useDroppable } from '@/hooks/useDroppable';

  const context = useDnDContext('Test');

  const { elementRef, isOver } = useDroppable({
    context,
    hooks: {
      onDrop: () => {
        console.log('onDrop context');
      },
    },
  });
</script>

<template>
  <div
    ref="elementRef"
    class="drop-zone"
  >
    {{ isOver }}
    <slot></slot>
  </div>
</template>

<style>
  .drop-zone {
    padding: 10px;
    background-color: beige;
  }
</style>

<script setup lang="ts">
  import { useDnDContext } from '@/hooks/useDnDContext';
  import { useDroppable } from '@/hooks/useDroppable';

  const context = useDnDContext('Test');

  const { elementRef, isOver } = useDroppable({
    context,
  });
</script>

<template>
  <div ref="elementRef">
    {{ isOver }}
    <slot></slot>
  </div>
</template>

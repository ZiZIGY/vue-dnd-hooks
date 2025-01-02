<script setup lang="ts">
  import { useDnDContext } from '@/hooks/useDnDContext';
  import { useDraggable } from '@/hooks/useDraggable';

  const context = useDnDContext('Test');

  const { elementRef, isOver } = useDraggable({
    context,
  });
</script>

<template>
  <div ref="elementRef"> {{ isOver }} 123123 </div>
</template>

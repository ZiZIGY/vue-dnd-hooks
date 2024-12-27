<script setup lang="ts">
  import { useDnDProvider } from '@/hooks/useDnDProvider';
  import { IDnDProvider } from '@/@types';
  const emit = defineEmits<{
    (e: 'drag-end', context: IDnDProvider): void;
  }>();

  useDnDProvider('Test', {
    onDragEnd: (context) => {
      emit('drag-end', context);
    },
  });
</script>

<template>
  <slot></slot>
</template>

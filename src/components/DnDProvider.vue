<script setup lang="ts">
  import { useDnDProvider } from '@/hooks/useDnDProvider';
  import { IDnDProvider } from '@/@types';
  const emit = defineEmits<{
    (e: 'drag-end', context: IDnDProvider): void;
  }>();

  useDnDProvider('Test', {
    dragEnd: (context) => {
      console.log('test');
      emit('drag-end', context);
    },
  });
</script>

<template>
  <slot></slot>
</template>

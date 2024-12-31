<script setup lang="ts">
  import { useDnDProvider } from '@/hooks/useDnDProvider';
  import { IDnDProvider } from '@/@types';
  const emit = defineEmits<{
    (e: 'drag-end', context: IDnDProvider): void;
  }>();

  const provider = useDnDProvider('Test', {
    dragEnd: (context) => {
      emit('drag-end', context);
    },
  });
</script>

<template>
  {{ provider }}
  <slot></slot>
</template>

<script setup lang="ts">
  import { useDroppable } from '@/hooks/useDroppable';
  import Skeleton from './Skeleton.vue';

  interface IDraggableProps {
    tag?: keyof HTMLElementTagNameMap;
  }

  const { tag = 'div' } = defineProps<IDraggableProps>();

  const { containerRef, isOver } = useDroppable('meme', {
    contextName: 'Test',
    onDrop: () => {
      console.log('dropped');
    },
  });
</script>

<template>
  <component
    ref="containerRef"
    :is="tag"
  >
    <slot></slot>
    <Skeleton v-if="isOver" />
  </component>
</template>

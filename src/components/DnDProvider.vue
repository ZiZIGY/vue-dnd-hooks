<script setup lang="ts">
  import { useDnDProvider } from '@/hooks/useDnDProvider';
  import { DnDProvider } from '@/types';

  interface Data {
    drag: {
      index: number;
      parentArray: any[];
    };
    over: {
      index: number;
      parentArray: any[];
    };
  }

  const provider = useDnDProvider<Data>('Test', {
    hooks: {
      onEnd: (context) => {
        console.log('onEnd context');
        emit('drop', context);
      },
    },
  });

  const emit = defineEmits<{
    (e: 'drop', context: DnDProvider<Data>): void;
  }>();
</script>

<template>
  <pre>
    {{ provider }}
  </pre>
  <slot></slot>
</template>

<style>
  pre {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }
</style>

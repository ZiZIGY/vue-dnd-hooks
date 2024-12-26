<script setup lang="ts">
  import { useDnDProvider } from '@/hooks/useDnDProvider';

  const provider = useDnDProvider('Test');
</script>

<template>
  {{ provider }}
  <slot></slot>
</template>

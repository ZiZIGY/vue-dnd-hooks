<script setup lang="ts">
  import { useDragContainer } from '../composables/useDragContainer';

  const { elementRef } = useDragContainer();
</script>

<template>
  <div ref="elementRef">123123asdasdas</div>
</template>

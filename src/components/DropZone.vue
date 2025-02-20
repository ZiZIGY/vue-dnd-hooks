<script setup lang="ts">
  import { useDrop } from '../composables/useDrop';

  const { elementRef, isOvered, isAllowed } = useDrop();
</script>

<template>
  <div
    ref="elementRef"
    :class="{ 'is-overed': isOvered, 'is-allowed': isAllowed }"
  >
    <slot />
  </div>
</template>

<style>
  .is-overed {
    background-color: gray;
  }
</style>

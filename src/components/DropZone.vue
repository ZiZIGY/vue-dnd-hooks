<script setup lang="ts">
  import { useDrop } from '../composables/useDrop';

  const { elementRef, isOvered } = useDrop();
</script>

<template>
  <div
    ref="elementRef"
    :class="{ 'is-overed': isOvered }"
  >
    <slot />
  </div>
</template>

<style>
  .is-overed {
    background-color: gray;
  }
</style>

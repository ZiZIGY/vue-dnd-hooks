<script setup lang="ts">
  import { useDrop } from '../composables/useDrop';

  const { elementRef, isOvered, isAllowed } = useDrop();
</script>

<template>
  <div
    ref="elementRef"
    class="drop-zone"
    :class="{ 'is-overed': isOvered, 'is-allowed': isAllowed }"
  >
    <slot />
  </div>
</template>

<style>
  .drop-zone {
    padding: 5px;
    border: 1px dashed red;
  }

  .is-overed {
    background-color: gray;
  }
</style>

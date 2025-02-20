<script setup lang="ts">
  import { useDrop } from '../composables/useDrop';

  const { elementRef, isOvered, isAllowed } = useDrop({
    groups: ['zone1'],
  });
</script>

<template>
  <div
    ref="elementRef"
    :class="{ 'is-overed': isOvered, 'is-allowed': isAllowed }"
  >
    <slot /> {{ isAllowed }} {{ isOvered }}
  </div>
</template>

<style>
  .is-overed {
    background-color: gray;
  }

  .is-allowed {
    background-color: green;
  }
</style>

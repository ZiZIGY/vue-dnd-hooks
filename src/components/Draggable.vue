<script setup lang="ts">
  import { useDrag } from '../composables/useDrag';

  const props = defineProps<{
    groups?: string[];
  }>();

  const { elementRef, handleDragStart, isOvered, isAllowed } = useDrag({
    groups: props.groups,
  });
</script>

<template>
  <div
    ref="elementRef"
    @pointerdown="handleDragStart"
  >
    drag me {{ isOvered }} {{ isAllowed }}

    <slot />
  </div>
</template>

<style scoped>
  div {
    user-select: none;
    touch-action: none;
    position: relative;
  }

  .point {
    position: absolute;
    width: 1px;
    height: 1px;
    background-color: red;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
</style>

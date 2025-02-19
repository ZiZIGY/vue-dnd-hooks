<script setup lang="ts">
  import { useDnDStore } from '../composables/useDnDStore';
  import { useDrag } from '../composables/useDrag';

  import Skeleton from './Skeleton.vue';

  const { elementRef, handleDragStart, isOvered, pointerPosition } = useDrag({
    layer: Skeleton,
  });

  const store = useDnDStore();
</script>

<template>
  <div
    ref="elementRef"
    @pointerdown="handleDragStart"
  >
    drag me

    <pre>
      {{ store }}
    </pre>
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

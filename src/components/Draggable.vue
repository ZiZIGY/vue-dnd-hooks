<script setup lang="ts">
  import { useDrag } from '../composables/useDrag';
  import { useSelectionManager } from '../managers/useSelectionManager';

  const { elementRef, handleDragStart } = useDrag({
    data: 'testy',
  });

  const { handleToggleSelect, isSelected } = useSelectionManager(elementRef);
</script>

<template>
  <div ref="elementRef">
    <input
      type="checkbox"
      :checked="isSelected"
      @change="handleToggleSelect"
    />
    <div @pointerdown="handleDragStart">+</div>
    <slot />
  </div>
</template>

<style scoped>
  div {
    user-select: none;
    touch-action: none;
    position: relative;
    display: flex;
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

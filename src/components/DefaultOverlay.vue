<script setup lang="ts">
  import { computed } from 'vue';
  import { useDragContainer } from '../composables/useDragContainer';

  const { elementRef, pointerPosition, isDragging, draggingElements } =
    useDragContainer();

  const computedStyle = computed(() => ({
    transform: `translate3d(${
      (pointerPosition.current.value?.x ?? 0) -
      (pointerPosition.offset.pixel.value?.x ?? 0)
    }px, ${
      (pointerPosition.current.value?.y ?? 0) -
      (pointerPosition.offset.pixel.value?.y ?? 0)
    }px, 0)`,
  }));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isDragging"
      ref="elementRef"
      :style="computedStyle"
      class="default-drag-overlay"
    >
      <div
        v-for="(element, index) in draggingElements"
        :key="index"
        v-html="element.initialHTML"
        :style="{
          width: `${element.initialRect?.width}px`,
          height: `${element.initialRect?.height}px`,
        }"
      />
    </div>
  </Teleport>
</template>

<style scoped>
  .default-drag-overlay {
    position: fixed;
    top: 0;
    left: 0;
    padding: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1000;
  }
</style>

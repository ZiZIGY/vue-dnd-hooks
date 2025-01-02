<script setup lang="ts">
  import { useDnDContext } from '@/hooks/useDnDContext';
  import { useDraggable } from '@/hooks/useDraggable';
  import { computed } from 'vue';

  const context = useDnDContext('Test');

  const { tag = 'div', ...props } = defineProps<{
    tag?: keyof HTMLElementTagNameMap;
    index: number;
    parentArray: any[];
  }>();

  const { elementRef, isDragging } = useDraggable({
    context,
    state: computed(() => ({
      index: props.index,
      parentArray: props.parentArray,
    })),
  });
</script>

<template>
  <component
    ref="elementRef"
    :is="tag"
    :class="{
      dragging: isDragging,
      meme: true,
    }"
  >
    <slot></slot>
    <div
      v-if="elementRef === context.hoveredElement?.node"
      class="placeholder"
    />
  </component>
</template>

<style>
  .dragging {
    background-color: blue;
  }

  .meme {
    position: relative;
  }

  .placeholder {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    height: 5px;
  }
</style>

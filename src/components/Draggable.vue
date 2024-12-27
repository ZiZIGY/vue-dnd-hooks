<script lang="ts" setup>
  import { DraggableProps } from '@/@types';
  import { useDraggable } from '@/hooks/useDraggable';
  import { useUniqueId } from '@/hooks/useUniqueID';

  const { tag = 'div', id = useUniqueId() } = defineProps<DraggableProps>();

  const { elementRef, position, isDragging, offset } = useDraggable(id, 'Test');
</script>

<template>
  <component
    ref="elementRef"
    :is="tag"
    :class="{
      draggable: true,
      dragging: isDragging,
    }"
    :style="{
      '--top': `${position.y - offset.y}px`,
      '--left': `${position.x - offset.x}px`,
    }"
  >
    <slot></slot>
  </component>
</template>

<style>
  .draggable {
    cursor: move;
  }
  .dragging {
    position: absolute;
    pointer-events: none;
    top: var(--top);
    left: var(--left);
  }
</style>

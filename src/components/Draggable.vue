<script lang="ts" setup>
  import { DraggableProps } from '@/@types';
  import { useDraggable } from '@/hooks/useDraggable';
  import { useUniqueId } from '@/hooks/useUniqueID';

  const { tag = 'div', id = useUniqueId() } = defineProps<DraggableProps>();

  const { elementRef, position, isDragging, offset } = useDraggable(id, {
    contextName: 'Test',
  });
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
    position: absolute;
    cursor: move;
    top: var(--top);
    left: var(--left);
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .dragging {
    pointer-events: none;
  }
</style>

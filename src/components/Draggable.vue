<script lang="ts" setup>
  import { DraggableProps } from '@/@types';
  import { useDraggable } from '@/hooks/useDraggable';
  import { useUniqueId } from '@/hooks/useUniqueID';

  const { id = useUniqueId() } = defineProps<DraggableProps>();

  const { elementRef, position, isDragging, offset, isOver } = useDraggable(
    id,
    'Test',
    {
      onOver: (context) => {
        console.log('over', context);
      },
      onLeave: (context) => {
        console.log('leave', context);
      },
    }
  );
</script>

<template>
  <div
    ref="elementRef"
    :class="{
      draggable: true,
      dragging: isDragging,
    }"
    :style="{
      '--top': `${position.y}px`,
      '--left': `${position.x}px`,
      '--offset-x': `-${offset.percentX}%`,
      '--offset-y': `-${offset.percentY}%`,
    }"
  >
  {{ isOver }}
    <slot />
  </div>
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
    transform: translate(var(--offset-x), var(--offset-y));
  }
</style>

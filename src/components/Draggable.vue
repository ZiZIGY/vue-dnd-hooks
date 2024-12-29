<script lang="ts" setup>
  import { DraggableProps } from '@/@types';
  import { useDnDContext } from '@/hooks/useDnDContext';
  import { useDraggable } from '@/hooks/useDraggable';
  import { useUniqueId } from '@/hooks/useUniqueID';
  import type { Component } from 'vue';

  const { tag = 'div', id = useUniqueId() } = defineProps<DraggableProps>();

  const { elementRef, position, isDragging, offset } = useDraggable(id, 'Test');
  interface Test {
    layer?: Component;
  }

  const context = useDnDContext<Test>('Test');
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
    <slot v-if="!context.layer" />
    <component
      v-else
      :is="context.layer"
    />
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

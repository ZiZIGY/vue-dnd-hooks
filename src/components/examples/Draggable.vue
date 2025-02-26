<script setup lang="ts" generic="T">
  import type { Component } from 'vue';
  import { useDrag, useSelectionManager, type IDnDStore } from 'vue-dnd-hooks';

  interface IDraggableProps<T> {
    container?: Component;
    data?: T;
    groups?: string[];
  }

  const props = defineProps<IDraggableProps<T>>();

  const emit = defineEmits<{
    (e: 'start', store: IDnDStore): void;
    (e: 'move', store: IDnDStore): void;
    (e: 'end', store: IDnDStore): void;
    (e: 'hover', store: IDnDStore): void;
    (e: 'leave', store: IDnDStore): void;
  }>();

  const {
    elementRef,
    handleDragStart,
    isAllowed,
    isDragging,
    isOvered,
    pointerPosition,
  } = useDrag({
    ...props,
    events: {
      onHover: (store: IDnDStore) => emit('hover', store),
      onLeave: (store: IDnDStore) => emit('leave', store),
      onStart: (store: IDnDStore) => emit('start', store),
      onMove: (store: IDnDStore) => emit('move', store),
      onEnd: (store: IDnDStore) => emit('end', store),
    },
  });

  const { isSelected, handleToggleSelect } = useSelectionManager(elementRef);
</script>

<template>
  <div ref="elementRef">
    <slot
      :handleDragStart="handleDragStart"
      :isAllowed="isAllowed"
      :isDragging="isDragging"
      :isOvered="isOvered"
      :pointerPosition="pointerPosition"
      :isSelected="isSelected"
      :handleToggleSelect="handleToggleSelect"
    />
  </div>
</template>

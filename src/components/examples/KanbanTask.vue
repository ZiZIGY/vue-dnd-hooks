<script lang="ts" setup>
  import { useDrag } from '@/hooks/useDrag';
  import DragHandle from '../DragHandle.vue';

  interface IKanbanTaskProps {
    id: string;
    title: string;
    parent: any[];
    index: number;
  }

  const props = defineProps<IKanbanTaskProps>();

  const { elementRef, startDragging, isDragging, isOvered } = useDrag({
    id: props.id,
    group: ['kanban-task'],
    state: props,
  });
</script>

<template>
  <div
    class="kanban-task"
    ref="elementRef"
    :style="{
      opacity: isDragging ? 0.5 : 1,
      pointerEvents: isDragging ? 'none' : 'auto',
      boxShadow: isOvered ? '0 0 10px 0 rgba(0, 0, 0, 0.5)' : 'none',
    }"
  >
    <DragHandle @pointerdown="startDragging" />
    {{ title }}
  </div>
</template>

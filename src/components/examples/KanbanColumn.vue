<script setup lang="ts">
  import { useDrag } from '@/hooks/useDrag';
  import DragHandle from '../DragHandle.vue';
  import DropZone from '../DropZone.vue';
  import KanbanTask from './KanbanTask.vue';
  import type { IDnDStore } from '@/types';

  interface IKanbanTask {
    id: string;
    title: string;
  }

  interface IKanbanColumnProps {
    id: string;
    title: string;
    items: IKanbanTask[];
    index: number;
  }

  const props = defineProps<IKanbanColumnProps>();

  const { elementRef, startDragging, isOvered, isDragging } = useDrag({
    id: props.id,
    group: ['kanban-column'],
    state: props,
  });

  const onDrop = ({ hovered, draggingElements, elements }: IDnDStore) => {
    draggingElements.forEach((element) => {
      const hoveredItem = elements.get(hovered?.elementId || '')
        ?.state as IKanbanTask & {
        index: number;
        parent: IKanbanTask[];
      };

      const { index, parent } = element.state as IKanbanTask & {
        index: number;
        parent: IKanbanTask[];
      };

      const [removed] = parent.splice(index, 1);

      if (hoveredItem) {
        hoveredItem.parent.splice(hoveredItem.index, 0, removed);
      } else {
        props.items.push(removed);
      }
    });
  };
</script>

<template>
  <div
    ref="elementRef"
    class="kanban-column"
    :style="{
      opacity: isDragging ? 0.5 : 1,
      pointerEvents: isDragging ? 'none' : 'auto',
      border: isOvered ? '1px solid #000' : 'none',
    }"
  >
    <header class="kanban-column__header">
      <DragHandle @pointerdown="startDragging" />
      <h3>{{ title }}</h3>
    </header>
    <DropZone
      :group="['kanban-task']"
      @drop="onDrop"
    >
      <KanbanTask
        v-for="(task, taskIndex) in items"
        :key="task.id"
        :id="task.id"
        :index="taskIndex"
        :title="task.title"
        :parent="items"
      />
    </DropZone>
  </div>
</template>

<style scoped>
  .kanban-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #f0f0f0;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  }
  .kanban-column__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .kanban-column__content {
    flex: 1;
  }
</style>

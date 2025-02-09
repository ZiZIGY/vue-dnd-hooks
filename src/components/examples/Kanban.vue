<script setup lang="ts">
  import { ref } from 'vue';
  import DropZone from '../DropZone.vue';
  import type { IDnDStore } from '@/types';
  import KanbanColumn from './KanbanColumn.vue';

  interface IKanbanTask {
    id: string;
    title: string;
  }

  interface IKanbanColumn {
    id: string;
    title: string;
    items: IKanbanTask[];
  }

  const columns = ref<IKanbanColumn[]>([
    {
      id: 'todo',
      title: 'To Do',
      items: [
        {
          id: '1',
          title: 'new task',
        },
        {
          id: '2',
          title: 'new task 2',
        },
      ],
    },

    {
      id: 'in-progress',
      title: 'In Progress',
      items: [],
    },
    {
      id: 'done',
      title: 'Done',
      items: [],
    },
  ]);

  interface IKanbanColumnState extends IKanbanColumn {
    index: number;
  }

  const onDrop = ({ hovered, draggingElements, elements }: IDnDStore) => {
    if (hovered?.elementId) {
      const hoveredState = elements.get(hovered.elementId)
        ?.state as IKanbanColumnState;

      draggingElements.forEach((element) => {
        const { index } = element.state as IKanbanColumnState;
        columns.value.splice(
          hoveredState.index,
          0,
          ...columns.value.splice(index, 1)
        );
      });
    }
  };
</script>

<template>
  <DropZone
    :group="['kanban-column']"
    @drop="onDrop"
    class="kanban-container"
  >
    <TransitionGroup name="kanban-container">
      <KanbanColumn
        v-for="(column, index) in columns"
        :key="column.id"
        :id="column.id"
        :title="column.title"
        :items="column.items"
        :index="index"
        class="kanban-col"
      />
    </TransitionGroup>
  </DropZone>
</template>

<style></style>

<script setup lang="ts">
  import { useDnDContext } from '@/hooks/useDnDContext';
  import { useDraggable } from '@/hooks/useDraggable';
  import { computed } from 'vue';
  import KanbanDroppable from './KanbanDroppable.vue';
  import KanbanTask from './KanbanTask.vue';

  interface IKanbanItem {
    id: string;
    title: string;
  }

  interface IKanban {
    id: string;
    name: string;
    items: IKanbanItem[];
  }

  interface IKanbanItemProps {
    item: IKanban;
    index: number;
    array: IKanban[];
  }

  const props = defineProps<IKanbanItemProps>();

  const context = useDnDContext('Test');

  const { elementRef, isDragging } = useDraggable({
    context,
    state: computed(() => props),
    group: 'kanban-item',
    hooks: {
      onOver: (context) => {
        if (context) {
          const state: IKanbanItemProps = context.draggingElement?.state;

          const [item] = state.array.splice(state.index, 1);
          state.array.splice(props.index, 0, item);
        }
      },
    },
  });
</script>

<template>
  <section
    :class="{
      'kanban-item': true,
      'kanban-item_dragging': isDragging,
    }"
    ref="elementRef"
  >
    <header>
      <h3>{{ item.name }}</h3>
    </header>

    <KanbanDroppable>
      <KanbanTask />
    </KanbanDroppable>
  </section>
</template>

<style>
  .kanban-item {
    padding: 10px;
    background-color: #969696;
    border-radius: 5px;
    cursor: grab;
    flex: 1;
  }

  .kanban-item_dragging {
    z-index: 1000;
  }
</style>

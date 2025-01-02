<script setup lang="ts">
  import { ref } from 'vue';
  import DnDProvider from './components/DnDProvider.vue';
  import { useUniqueId } from './hooks/useUniqueID';
  import KanbanItem from './components/KanbanItem.vue';

  interface IKanbanItem {
    id: string;
    title: string;
  }

  interface IKanban {
    id: string;
    name: string;
    items: IKanbanItem[];
  }

  const kanban = ref<IKanban[]>([
    {
      id: useUniqueId(),
      name: 'Начало',
      items: [
        {
          id: useUniqueId(),
          title: 'Сделать что-то',
        },
      ],
    },
    {
      id: useUniqueId(),
      name: 'В процессе',
      items: [
        {
          id: useUniqueId(),
          title: 'В процессе что то',
        },
      ],
    },
    {
      id: useUniqueId(),
      name: 'Завершено',
      items: [
        {
          id: useUniqueId(),
          title: 'Завершено что то',
        },
      ],
    },
  ]);
</script>

<template>
  <DnDProvider>
    <TransitionGroup
      class="kanban"
      name="list"
      tag="div"
    >
      <KanbanItem
        v-for="(item, index) in kanban"
        :key="item.id"
        :item="item"
        :index="index"
        :array="kanban"
      />
    </TransitionGroup>
  </DnDProvider>
</template>

<style>
  .kanban {
    display: flex;
    gap: 10px;
    position: relative;
    padding: 10px;
    height: 50vh;
    background-color: #f0f0f0;
  }
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }
  *[data-pressed] {
    background-color: red;
  }
</style>

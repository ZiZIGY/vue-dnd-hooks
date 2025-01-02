<script setup lang="ts">
  import Draggable from './Draggable.vue';

  interface IUser {
    id: string;
    name: string;
    age: number;
    children?: IUser[];
  }

  defineProps<{
    items: IUser[];
  }>();
</script>

<template>
  <TransitionGroup
    name="list"
    tag="ul"
    appear
  >
    <Draggable
      v-for="(item, index) in items"
      :key="item.id"
      :index="index"
      :parent-array="items"
      tag="li"
    >
      {{ item.id }}
      <Sortable
        v-if="item.children"
        :items="item.children"
      />
    </Draggable>
  </TransitionGroup>
</template>

<style>
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }

  ul {
    position: relative;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
  }

  .list-leave-active {
    position: absolute;
  }
</style>

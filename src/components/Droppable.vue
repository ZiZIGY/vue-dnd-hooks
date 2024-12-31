<script setup lang="ts">
  import { useDroppable } from '@/hooks/useDroppable';
  import Skeleton from './Skeleton.vue';
  import { useUniqueId } from '@/hooks/useUniqueID';
  import { DnDEntityID } from '@/@types';
  import { markRaw, type Component } from 'vue';

  interface IDroppableProps {
    tag?: keyof HTMLElementTagNameMap;
    id?: DnDEntityID;
  }

  const { id = useUniqueId() } = defineProps<IDroppableProps>();

  interface Test {
    layer?: Component;
  }

  const { elementRef, isOver } = useDroppable<Test>(id, 'Test', {
    onOver: (context) => {
      context.layer = markRaw(Skeleton);
    },
    onLeave: (context) => {
      context.layer = undefined;
    },
  });
</script>

<template>
  <div
    ref="elementRef"
    :class="{
      'drop-tr': isOver,
    }"
  >
    <slot></slot>
  </div>
</template>

<style>
  .drop-tr {
    background-color: rgb(223, 223, 223);
    opacity: 0.5;
    height: 50px;
    box-sizing: border-box;
    padding: 10px;
    border: 1px dashed grey;
    border-radius: 10px;
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
</style>

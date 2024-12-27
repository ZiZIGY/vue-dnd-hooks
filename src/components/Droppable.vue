<script setup lang="ts">
  import { useDroppable } from '@/hooks/useDroppable';
  import Skeleton from './Skeleton.vue';
  import { useUniqueId } from '@/hooks/useUniqueID';
  import { DnDEntityID } from '@/@types';

  interface IDroppableProps {
    tag?: keyof HTMLElementTagNameMap;
    id?: DnDEntityID;
  }

  const { tag = 'div', id = useUniqueId() } = defineProps<IDroppableProps>();
  const emit = defineEmits<{
    (e: 'dropped', id: DnDEntityID): void;
  }>();

  const { containerRef, isOver, currentRect, initialRect } = useDroppable(
    id,
    'Test',
    {
      onDrop: () => {
        emit('dropped', id);
      },
    }
  );
</script>

<template>
  <component
    ref="containerRef"
    :is="tag"
  >
    <slot></slot>
    <Skeleton v-if="isOver" />
  </component>
</template>

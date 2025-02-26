<script setup lang="ts" generic="T">
  import { useDrop, type IDnDStore } from 'vue-dnd-hooks';

  interface IDroppableProps<T> {
    groups?: string[];
    data?: T;
  }

  const props = defineProps<IDroppableProps<T>>();

  const emit = defineEmits<{
    (e: 'drop', store: IDnDStore): void;
    (e: 'hover', store: IDnDStore): void;
    (e: 'leave', store: IDnDStore): void;
  }>();

  const { elementRef, isAllowed, isOvered } = useDrop({
    ...props,
    events: {
      onDrop: (store: IDnDStore) => emit('drop', store),
      onHover: (store: IDnDStore) => emit('hover', store),
      onLeave: (store: IDnDStore) => emit('leave', store),
    },
  });
</script>

<template>
  <div ref="elementRef">
    <slot
      :is-allowed="isAllowed"
      :is-overed="isOvered"
    />
  </div>
</template>

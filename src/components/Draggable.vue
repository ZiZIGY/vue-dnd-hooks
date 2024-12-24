<script lang="ts" setup>
  import { DraggableProps, IDnDContext } from '@/@types';
  import { useDraggable } from '@/hooks/useDraggable';
  import { useUniqueId } from '@/hooks/useUniqueId';
  import { contextName } from '@/utils';
  import { computed, inject, ref } from 'vue';

  const {
    tag = 'div',
    id = useUniqueId(),
    hideOnDrag = false,
  } = defineProps<DraggableProps>();

  const context = inject<IDnDContext>(contextName);

  if (!context) throw new Error('DnDContext is not provided');

  const showRef = computed<boolean>(() => {
    if (hideOnDrag) return !context?.isDragging;
    return true;
  });
  const transitioning = ref<boolean>(false);

  const { elementRef, position, currentRect } = useDraggable({
    id,
    onStart: () => {
      context.isDragging = true;
    },
    onEnd: () => {
      context.isDragging = false;
    },
  });
</script>

<template>
  <Transition name="draggable">
    <component
      v-if="showRef"
      ref="elementRef"
      :is="tag"
      :class="{
        draggable: true,
        dragging: context.isDragging,
      }"
    >
      <slot></slot>
    </component>
  </Transition>

  <Transition
    name="draggable-layer"
    @before-enter="transitioning = true"
    @after-leave="transitioning = false"
  >
    <div
      v-if="context.isDragging"
      class="draggable-layer"
    >
      <slot name="layer">
        <slot></slot>
      </slot>
    </div>
  </Transition>
</template>

<style></style>

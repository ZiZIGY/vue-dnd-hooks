<script setup lang="ts">
  import { IDnDContext } from '@/@types';
  import { contextName } from '@/utils';
  import { provide, reactive } from 'vue';

  const context = reactive<IDnDContext>({
    isDragging: false,
  });

  provide(contextName, context);
</script>

<template>
  <slot></slot>
</template>

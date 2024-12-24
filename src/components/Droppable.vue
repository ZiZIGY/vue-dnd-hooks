<script setup lang="ts">
  interface IDraggableProps {
    tag?: keyof HTMLElementTagNameMap;
  }

  defineProps<IDraggableProps>();
</script>

<template>
  <component>
    <slot></slot>
  </component>
</template>

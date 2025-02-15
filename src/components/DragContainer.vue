<script setup lang="ts">
  import { useDragContainerManager } from '../managers/useDragContainerManager';

  const { activeContainer } = useDragContainerManager();
</script>

<template>
  <component :is="activeContainer" />
</template>

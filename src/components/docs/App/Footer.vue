<script setup lang="ts">
  const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <div class="container mx-auto">
      <p class="text-gray-400 text-sm text-center py-4">
        &copy; {{ year }} Vue DnD Hooks. All rights reserved.
      </p>
    </div>
  </footer>
</template>

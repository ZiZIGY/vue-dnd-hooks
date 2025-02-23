<script setup lang="ts">
  interface ICard {
    title: string;
    description: string;
    icon: string;
  }

  const cards: ICard[] = [
    {
      title: 'Simple Composables API',
      description: 'Intuitive hooks-based approach',
      icon: '🎯',
    },
    {
      title: 'Full Customization',
      description: 'Flexible styling system',
      icon: '🎨',
    },
    {
      title: 'TypeScript Ready',
      description: 'Type inference and type safety',
      icon: '🔍',
    },
    {
      title: 'Performance Optimized',
      description: 'Minimal re-renders and efficient updates',
      icon: '⚡',
    },
    {
      title: 'Touch Devices Support',
      description: 'Smooth touch gestures',
      icon: '👆',
    },
    {
      title: 'Nested Containers',
      description: 'Works with nested containers',
      icon: '🔄',
    },
  ];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg shadow-gray-900/50 hover:shadow-emerald-500/20 hover:bg-gray-800/80 transition-all duration-300"
    >
      <div
        class="bg-gray-700/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-inner"
      >
        <div class="text-2xl">{{ card.icon }}</div>
      </div>
      <h3 class="text-xl font-bold mb-2">{{ card.title }}</h3>
      <p class="text-gray-400">{{ card.description }}</p>
    </div>
  </div>
</template>

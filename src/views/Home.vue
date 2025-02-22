<script setup lang="ts">
  // Импорты, если нужны
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
  >
    <div class="container mx-auto">
      <!-- Верхняя секция с лого и описанием -->
      <div class="flex items-center justify-between py-20">
        <div class="max-w-2xl">
          <h1 class="text-5xl font-bold mb-4">
            Vue Drag & Drop
            <div class="text-4xl font-normal text-gray-400 mt-2">
              Collection of Vue Drag & Drop Utilities
            </div>
          </h1>
          <p class="text-xl text-gray-400 mb-8">
            A powerful and flexible drag & drop library for Vue.js applications
            with TypeScript support
          </p>

          <!-- Кнопки действий -->
          <div class="flex gap-4">
            <a
              href="#get-started"
              class="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors"
            >
              Get Started
            </a>
            <a
              href="https://github.com/ZiZiGY/vue-dnd-hooks"
              target="_blank"
              class="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <!-- Лого справа -->
        <div class="w-96 h-96 relative">
          <img
            src="/logo.svg"
            alt="Vue Drag & Drop Logo"
            class="w-full h-full object-contain"
          />
        </div>
      </div>

      <!-- Секция с преимуществами -->
      <div class="grid grid-cols-3 gap-8 py-12">
        <div class="bg-gray-800 p-6 rounded-lg">
          <div class="text-emerald-500 text-4xl mb-4">🎯</div>
          <h3 class="text-xl font-bold mb-2">Simple Composables API</h3>
          <p class="text-gray-400"
            >Intuitive hooks-based approach with clean and declarative syntax</p
          >
        </div>

        <div class="bg-gray-800 p-6 rounded-lg">
          <div class="text-emerald-500 text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-bold mb-2">Optimized Performance</h3>
          <p class="text-gray-400"
            >Virtual DOM friendly with minimal re-renders and efficient
            updates</p
          >
        </div>

        <div class="bg-gray-800 p-6 rounded-lg">
          <div class="text-emerald-500 text-4xl mb-4">📱</div>
          <h3 class="text-xl font-bold mb-2">Advanced Input Support</h3>
          <p class="text-gray-400"
            >Full support for touch devices and multi-touch gestures</p
          >
        </div>
        <Lamp />
      </div>
    </div>
  </div>
</template>

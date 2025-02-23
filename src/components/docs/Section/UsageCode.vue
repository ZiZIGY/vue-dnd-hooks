<script lang="ts" setup>
  import { onMounted } from 'vue';
  import Prism from 'prismjs';
  import 'prismjs/themes/prism-tomorrow.css';
  import 'prismjs/components/prism-typescript';

  onMounted(() => Prism.highlightAll());
</script>

<template>
  <section
    class="py-24 bg-gray-900/50 backdrop-blur-sm"
    aria-labelledby="simple-to-use"
  >
    <div class="container mx-auto px-4">
      <!-- Статистика -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="text-center">
          <div class="text-4xl font-bold text-emerald-400 mb-2"
            >~5 Kb (Gzip)</div
          >
          <div class="text-gray-400">Lightweight</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-emerald-400 mb-2">100%</div>
          <div class="text-gray-400">Type Coverage</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-emerald-400 mb-2">Vue 3</div>
          <div class="text-gray-400">Composition API</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2
            class="text-3xl font-bold text-white mb-4"
            id="simple-to-use"
            >Simple to Use</h2
          >
          <p class="text-gray-400 mb-8">
            Start using drag & drop functionality in your Vue.js application
            with just a few lines of code.
          </p>
          <a
            href="/guide"
            class="inline-flex items-center px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors"
          >
            Learn More
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <!-- Пример кода с подсветкой синтаксиса -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <pre class="text-sm text-gray-300">
            <code class="language-typescript">
import { useDrag, useDrop } from 'vue-dnd-hooks'

// Make an element draggable
const { isDragging, elementRef } = useDrag({
  events: {
    // Triggers when drag stoped and dropzone is not over
    onEnd: () => console.log('Dragging finished')
  }
})

// Make an element accept drops
const { isOvered, elementRef } = useDrop({
  events: {
    onDrop: () => console.log('Item dropped')
  }
})
            </code>
          </pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

<script setup lang="ts">
  import { onMounted, onUpdated, ref } from 'vue';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/components/prism-typescript';
  import 'prismjs/components/prism-bash';
  import 'prismjs/components/prism-markup';

  import getStarted from './getStarted.json';
  const activeTab = ref('yarn');

  const installCommands: Record<string, string> = {
    npm: 'npm install vue-dnd-hooks',
    yarn: 'yarn add vue-dnd-hooks',
    pnpm: 'pnpm add vue-dnd-hooks',
  };

  const copyCommand = async (command: string) => {
    await navigator.clipboard.writeText(command);
    // Можно добавить тост уведомление о копировании
  };

  onMounted(() => Prism.highlightAll());
  onUpdated(() => Prism.highlightAll());
</script>

<template>
  <section
    class="py-24 bg-gray-900/50 backdrop-blur-sm dot-background"
    id="get-started"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-white text-center mb-12"
        >Get Started</h2
      >
      <div class="max-w-3xl mx-auto mb-16 shadow-xl">
        <h3 class="text-2xl font-semibold text-white mb-6">Installation</h3>

        <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
          <div class="flex border-b border-gray-700">
            <button
              v-for="pm in ['npm', 'yarn', 'pnpm']"
              :key="pm"
              @click="activeTab = pm"
              class="px-4 py-2 text-sm font-medium transition-colors"
              :class="
                activeTab === pm
                  ? 'text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-gray-400 hover:text-white'
              "
            >
              {{ pm }}
            </button>
          </div>

          <div class="p-4 relative group shadow-2xl">
            <code class="text-gray-300 language-bash">
              {{ installCommands[activeTab] }}
            </code>
            <button
              @click="copyCommand(installCommands[activeTab])"
              class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Important Setup -->
      <div class="max-w-3xl mx-auto mb-16">
        <h3 class="text-2xl font-semibold text-white mb-6">Required Setup</h3>
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <p class="text-gray-300 mb-4">
            To enable drag overlay functionality, you need to add the
            <code class="text-emerald-400">DragOverlay</code> component to your
            app. This is a required utility component that serves as a container
            for default and your custom drag previews
          </p>
          <pre>
            <code class="language-markup">
              {{getStarted.appCode}}
            </code>
          </pre>
          <p class="text-gray-300 mt-4">
            If you want to create your own overlay component, here's an example:
          </p>
          <pre>
            <code class="language-markup language-typescript">
              {{getStarted.overlayCode}}
            </code>
          </pre>
          <p class="text-gray-400 text-sm mt-2">
            The overlay component works with the internal DnD store to render
            either your custom container component or falls back to a default
            overlay during drag operations.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import HomeCards from './HomeCards.vue';
  import gsap from 'gsap';
  import { TextPlugin } from 'gsap/TextPlugin';
  import { onMounted, ref } from 'vue';

  gsap.registerPlugin(TextPlugin);

  const logoRef = ref<HTMLElement | null>(null);
  const logoText = ref('Vue Drag & Drop');

  const underLogoRef = ref<HTMLElement | null>(null);
  const underLogoText = ref('⚒️ Collection of Vue Drag & Drop Utilities');

  onMounted(() => {
    gsap.to(logoRef.value, {
      duration: 0.5,
      text: {
        value: logoText.value,
        delimiter: '',
      },
      ease: 'none',
      onComplete: () => {
        gsap.to(underLogoRef.value, {
          duration: 1.5,
          text: {
            value: underLogoText.value,
          },
          ease: 'none',
        });
      },
    });
  });
</script>

<template>
  <section
    class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    aria-labelledby="preview"
  >
    <div class="container mx-auto">
      <!-- Верхняя секция с адаптивным layout -->
      <div
        class="flex flex-col lg:flex-row items-center lg:justify-between py-20 gap-8"
      >
        <!-- Лого для мобильных и планшетов -->
        <div class="w-64 h-64 lg:hidden">
          <img
            src="/logo.svg"
            alt="Vue Drag & Drop Logo"
            class="w-full h-full object-contain"
          />
        </div>

        <!-- Текстовый контент -->
        <div class="max-w-2xl text-center lg:text-left">
          <h1
            class="text-4xl lg:text-5xl font-bold mb-4"
            id="preview"
          >
            <span ref="logoRef"> </span>
            <div class="text-3xl lg:text-4xl font-normal text-gray-400 mt-2">
              <span ref="underLogoRef"></span>
            </div>
          </h1>
          <p class="text-lg lg:text-xl text-gray-400 mb-8">
            A powerful and flexible drag & drop library for Vue.js applications
            with TypeScript support
          </p>

          <!-- Кнопки действий -->
          <div class="flex justify-center lg:justify-start gap-4">
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

        <!-- Лого для десктопа -->
        <div class="hidden lg:block w-96 h-96">
          <img
            src="/logo.svg"
            alt="Vue Drag & Drop Logo"
            class="w-full h-full object-contain"
          />
        </div>
      </div>

      <HomeCards />
    </div>
  </section>
</template>

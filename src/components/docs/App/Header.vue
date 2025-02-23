<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  const isScrolled = ref(false);

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  const routes = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Guide',
      path: '/guide',
    },
    {
      name: 'Examples',
      path: '/examples',
    },
  ];
</script>

<template>
  <!-- Навигация -->
  <header
    class="fixed w-full z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-gray-900/80 backdrop-blur-md shadow-lg shadow-gray-900/20'
        : 'bg-transparent',
    ]"
  >
    <div class="container mx-auto flex items-center justify-between p-4">
      <router-link
        to="/"
        class="flex items-center gap-2"
      >
        <span class="text-white font-semibold text-xl hidden md:block">
          Vue DnD Hooks
        </span>
      </router-link>

      <nav class="flex items-center gap-6">
        <router-link
          v-for="item in routes"
          :key="item.name"
          :to="item.path"
          class="text-gray-400 hover:text-emerald-400 transition-colors relative group"
        >
          {{ item.name }}
          <span
            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"
          />
        </router-link>

        <a
          href="https://github.com/ZiZiGY/vue-dnd-hooks"
          target="_blank"
          class="text-gray-400 hover:text-white transition-colors ml-4"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  interface IAsideMenuSection {
    title: string;
    items: { text: string; link: string }[];
  }

  interface IAsideMenuProps {
    sections: IAsideMenuSection[];
  }

  defineProps<IAsideMenuProps>();
</script>

<template>
  <aside class="w-64 overflow-y-auto px-4 py-8 border-r border-gray-800">
    <nav>
      <div
        v-for="section in sections"
        :key="section.title"
        class="mb-8"
      >
        <h2 class="text-gray-400 text-sm font-semibold mb-2">
          {{ section.title }}
        </h2>
        <ul class="space-y-2">
          <li
            v-for="item in section.items"
            :key="item.text"
          >
            <router-link
              :to="item.link"
              class="text-gray-400 hover:text-emerald-400 transition-colors block py-1 text-sm"
              :class="{ 'text-emerald-400': $route.path === item.link }"
            >
              {{ item.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>

  <!-- Добавляем отступ для основного контента -->
  <div class="ml-64">
    <slot />
  </div>
</template>

<style scoped>
  aside {
    scrollbar-width: thin;
    scrollbar-color: rgba(16, 185, 129, 0.5) transparent;
  }

  aside::-webkit-scrollbar {
    width: 6px;
  }

  aside::-webkit-scrollbar-track {
    background: transparent;
  }

  aside::-webkit-scrollbar-thumb {
    background-color: rgba(16, 185, 129, 0.5);
    border-radius: 3px;
  }
</style>

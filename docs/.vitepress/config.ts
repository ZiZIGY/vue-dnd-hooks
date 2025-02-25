import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Vue DnD Hooks',
  description: 'Vue 3 Drag and Drop Hooks Library',
  base: '/vue-dnd-hooks/', // Важно! Имя вашего репозитория
  themeConfig: {
    // Навигация
    nav: [
      {
        text: 'Guide',
        items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
      },
    ],

    // Боковое меню
    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
      },
      {
        text: 'Composables',
        items: [
          { text: 'useDrag', link: '/composables/use-drag' },
          { text: 'useDrop', link: '/composables/use-drop' },
          { text: 'useDnDStore', link: '/composables/use-dnd-store' },
          { text: 'useDragContainer', link: '/composables/use-drag-container' },
        ],
      },
    ],

    // Ссылки на соцсети/репозиторий
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zizigy/vue-dnd-hooks' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 ZIZIGY',
    },
  },
});

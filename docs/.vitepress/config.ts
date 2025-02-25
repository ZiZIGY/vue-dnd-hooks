import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Vue DnD Hooks',
  description: 'Vue 3 Drag and Drop Hooks Library',
  base: '/vue-dnd-hooks/',
  themeConfig: {
    // Навигация
    nav: [
      {
        text: 'Guide',
        items: [
          {
            text: 'Getting Started',
            link: '/guide/getting-started',
          },
        ],
      },
    ],

    // Боковое меню
    sidebar: [
      {
        text: 'Introduction',
        items: [
          {
            text: 'Getting Started',
            link: '/guide/getting-started',
          },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'DragOverlay', link: '/guide/components/drag-overlay' },
        ],
      },
      {
        text: 'Composables',
        items: [
          { text: 'useDrag', link: '/guide/composables/use-drag' },
          { text: 'useDrop', link: '/guide/composables/use-drop' },
          {
            text: 'useDnDStore',
            link: '/guide/composables/use-dnd-store',
          },
          {
            text: 'useDragContainer',
            link: '/guide/composables/use-drag-container',
          },
          {
            text: 'useAutoScroll',
            link: '/guide/composables/use-auto-scroll',
          },
          {
            text: 'useElementSize',
            link: '/guide/composables/use-element-size',
          },
          {
            text: 'useGeometry',
            link: '/guide/composables/use-geometry',
          },
          {
            text: 'useBounding',
            link: '/guide/composables/use-bounding',
          },
        ],
      },
      {
        text: 'Managers',
        items: [
          {
            text: 'useSelectionManager',
            link: '/guide/managers/use-selection-manager',
          },
        ],
      },
      {
        text: 'Types',
        link: '/guide/types',
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

---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Vue DnD Hooks'
  text: '🛠 Full Custom DnD'
  tagline: Modern drag & drop solution for Vue 3. Your DnD, your rules.
  image:
    src: https://raw.githubusercontent.com/ZiZiGY/vue-dnd-hooks/master/public/logo.svg
    alt: Vue DnD Hooks
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/zizigy/vue-dnd-hooks

features:
  - icon: 🎯
    title: Zero Dependencies
    details: Built with pure Vue 3 Composition API. No external dependencies required, keeping your project lean and fast.

  - icon: 🔄
    title: Full TypeScript Support
    details: Written in TypeScript with complete type definitions. Get full IDE support and type safety out of the box.

  - icon: 🎨
    title: Fully Customizable
    details: Complete control over the drag & drop behavior and styling. Create your perfect implementation with custom animations and interactions.

  - icon: ⚡️
    title: Lightweight & Fast
    details: Optimized performance with minimal overhead. Smooth drag & drop operations without compromising speed.

  - icon: 📱
    title: Touch Friendly
    details: Works great on mobile devices. Built-in touch support for modern mobile experiences.

  - icon: 🧩
    title: Composable
    details: Modular design with composable functions. Mix and match features to build your ideal solution.
---

<style>
:root {
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #42b883 50%, #35495e 50%);
  --vp-home-hero-image-filter: blur(72px);
}

/* Уменьшаем базовую прозрачность фона */
.VPHero .image-bg {
  opacity: 0.5; /* было 0.8 */
  transition: opacity 1s ease;
}

.VPHero .image-container {
  transform: scale(1.2);
}

/* Настраиваем свечение для светлой и темной темы */
.VPHero .image-container::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: var(--vp-home-hero-image-background-image);
  filter: blur(120px);
  opacity: 0.3; /* было 0.6 */
  z-index: -1;
  animation: pulse 4s ease-in-out infinite;
}

/* Настройка для светлой темы */
html:not(.dark) .VPHero .image-container::after {
  opacity: 0.2; /* Еще меньше прозрачности для светлой темы */
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3; /* Уменьшили с 0.6 */
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.4; /* Уменьшили с 0.8 */
  }
}

/* Свечение при наведении тоже делаем мягче */
.VPHero .image-container:hover::after {
  animation: none;
  opacity: 0.5; /* было 0.8 */
  filter: blur(90px);
  transition: all 0.5s ease;
}
</style>

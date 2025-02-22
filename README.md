# Vue Drag & Drop Library

<p align="center">
  <svg
    width="396"
    height="341"
    viewBox="-50 -50 396 341"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="vueGradient"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="0"
        x2="256"
        y2="0"
      >
        <stop
          offset="0%"
          style="stop-color: #41b883"
        >
          <animate
            attributeName="offset"
            values="-0.5;0.5;-0.5"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop
          offset="50%"
          style="stop-color: #35495e"
        >
          <animate
            attributeName="offset"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop
          offset="100%"
          style="stop-color: #41b883"
        >
          <animate
            attributeName="offset"
            values="0.5;1.5;0.5"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
      <filter
        id="shadow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feDropShadow
          dx="0"
          dy="8"
          stdDeviation="12"
          flood-color="#35495E"
          flood-opacity="0.4"
        />
      </filter>
      <filter
        id="cursorShadow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="3"
          flood-color="#35495E"
          flood-opacity="0.4"
        />
      </filter>
    </defs>
    <g opacity="0.5">
      <path
        d="M157.44 0L128 51.2L97.92 0H0L128 220.8L256 0H157.44Z"
        fill="#41B883"
      />
      <path
        d="M157.44 0L128 51.2L97.92 0H50.56L128 132.48L204.8 0H157.44Z"
        fill="#35495E"
      />
    </g>
    <g
      transform="translate(40, 20)"
      filter="url(#shadow)"
    >
      <path
        d="M157.44 0L128 51.2L97.92 0H0L128 220.8L256 0H157.44Z"
        fill="#41B883"
        stroke="url(#vueGradient)"
        stroke-width="2"
      />
      <path
        d="M157.44 0L128 51.2L97.92 0H50.56L128 132.48L204.8 0H157.44Z"
        fill="#35495E"
        stroke="url(#vueGradient)"
        stroke-width="2"
      />
    </g>
    <g
      transform="translate(130, 90) scale(4)"
      style="color: white"
    >
      <g
        fill="white"
        filter="url(#cursorShadow)"
      >
        <g
          opacity="1"
          transform="translate(-1.5, 0)"
        >
          <path
            d="M17.318 11.75c0 3.037-3.515 5.466-6 5.466s-7.5-3.429-7.5-6.466c0-1.935.233-1.98 2.5-2.5c.47-.108.208-3.775 1-4c1.5-.426 2.881-1.326 3.5-1.5c1 .5 2.204 1.06 2.5 1c1.665-.333 1 2.5 3 2c1.419.878 1 4.086 1 6"
          />
        </g>
        <path
          d="M7.183 3.72a1.875 1.875 0 0 1 3.645-.448a1.875 1.875 0 0 1 2.849 1.603v.21q.235-.084.5-.085h.375c1.035 0 1.875.84 1.875 1.875v4.56l.004.065c0 2.136-.806 3.774-2.043 4.874C13.16 17.465 11.538 18 9.931 18c-3.264 0-5.394-2.187-6.923-4.733a47 47 0 0 1-.978-1.559C.898 9.842 2.269 7.503 4.427 7.5V5.375A1.875 1.875 0 0 1 7.183 3.72m-.006 1.655a.875.875 0 1 0-1.75 0V10a.5.5 0 0 1-1 0V8.5c-1.403.003-2.257 1.51-1.542 2.69c.357.59.697 1.135.962 1.533l.006.01l.007.01C5.33 15.193 7.199 17 9.93 17c1.394 0 2.771-.465 3.794-1.374c1.001-.89 1.69-2.23 1.707-4.062l-.004-.064V6.875A.875.875 0 0 0 14.552 6h-.375a.5.5 0 0 0-.5.5v1a.5.5 0 1 1-1 0V4.875a.875.875 0 1 0-1.75 0V7a.5.5 0 1 1-1 0V3.875a.875.875 0 1 0-1.75 0V7.5a.5.5 0 0 1-1 0z"
          clip-rule="evenodd"
          fill="#35495f"
        />
      </g>
    </g>
  </svg>
</p>

A powerful and flexible drag & drop library for Vue.js applications with TypeScript support.

## Features

### Core Capabilities

- 🎯 **Simple Composables API**

  - Intuitive hooks-based approach
  - Clean and declarative syntax
  - Minimal boilerplate code
- 🎨 **Full Customization**

  - Custom drag overlays
  - Flexible styling system
  - Animation support
  - Custom drag handles
- 📱 **Advanced Input Support**

  - Touch devices support
  - Mouse events
  - Multi-touch gestures

### Performance

- ⚡ **Optimized Rendering**

  - Virtual DOM friendly
  - Minimal re-renders
  - Efficient DOM updates
  - Memory leak prevention
- 🔄 **Smart Auto-scrolling**

  - Smooth scroll animations
  - Configurable thresholds
  - Performance-optimized
  - Works with nested scrollable containers

### Developer Experience

- 🔍 **TypeScript Ready**

  - Full type coverage
  - Type inference
  - IDE autocompletion
  - Type-safe events
- 📐 **Layout Features**

  - Grid system support
  - Flex layout compatible
  - Responsive design ready
  - Dynamic constraints

### Advanced Features

- 🎯 **Smart Grouping**

  - Element groups
  - Zone filtering
  - Nested groups
  - Dynamic group validation
- 📊 **Rich Events System**

  - Comprehensive lifecycle events
  - Custom event handlers
  - Drag state tracking
  - Position coordinates
- 🛡️ **Built-in Utilities**

  - Geometry calculations
  - Bounding box tracking
  - Position management
  - Intersection detection

### Integration

- 🔌 **Framework Integration**
  - Vue 3 Composition API
  - Nuxt.js compatible
  - Works with SSR
  - Plugin ecosystem ready

## Installation

Choose your preferred package manager:

```bash
npm install vue-dnd-hooks
```

```bash
yarn add vue-dnd-hooks
```

```bash
pnpm install vue-dnd-hooks
```

## Basic Usage

### App.vue

<sup>📄 Root Application Component</sup>

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { DragOverlay } from 'vue-dnd-hooks';
  import Draggable from './components/Draggable.vue';
  import Droppable from './components/Droppable.vue';

  const handleDrop = () => (elementInDropZone.value = true);

  const handleEnd = () => (elementInDropZone.value = false);

  const elementInDropZone = ref<boolean>(false);
</script>

<template>
  <div>
    <Draggable v-if="!elementInDropZone"> drag me </Draggable>
    <Droppable @drop="handleDrop">
      <Draggable
        v-if="elementInDropZone"
        @end="handleEnd"
      >
        im in drop zone
      </Draggable>
    </Droppable>

    <DragOverlay />
  </div>
</template>
```

### Draggable.vue

<sup>🧩 components/Draggable.vue</sup>

```vue
<script setup lang="ts">
  import { useDrag } from 'vue-dnd-hooks';

  const emit = defineEmits<{
    (e: 'end'): void;
  }>();

  const { elementRef, handleDragStart, isDragging } = useDrag({
    events: { onEnd: () => emit('end') },
  });
</script>

<template>
  <div
    ref="elementRef"
    @pointerdown="handleDragStart"
    :class="{ dragging: isDragging }"
  >
    <slot />
  </div>
</template>

<style scoped>
  .dragging {
    opacity: 0.5;
  }
</style>
```

### Droppable.vue

<sup>🧩 components/Droppable.vue</sup>

```vue
<script setup lang="ts">
  import { useDrop } from 'vue-dnd-hooks';

  const emit = defineEmits<{
    (e: 'drop'): void;
  }>();

  const { elementRef, isOvered } = useDrop({
    events: { onDrop: () => emit('drop') },
  });
</script>

<template>
  <div
    ref="elementRef"
    :class="{
      droppable: true,
      'is-overed': isOvered,
    }"
  >
    drop here
    <slot />
  </div>
</template>

<style scoped>
  .droppable {
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }
  .is-overed {
    background-color: #f0f0f0;
    border: 1px dashed red;
  }
</style>
```

## 📝 Contributing

(Not Ready)

<p align="center">
  <s>We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.</s>
</p>

## 🎯 Roadmap

- [ ]  File upload with drag & drop
- [ ]  React port (probably not, react have dnd-kit)
- [ ]  Accessibility improvements (ARIA)

## 🌟 Showcase

Projects using Vue Drag & Drop Library:

- [Project Name](link) - Brief description
- [Your Project Here](link) - Submit your project!

## 💖 Support

If you find this library helpful, please consider:

- Giving it a star on GitHub ⭐
- Sharing it with others

## 📄 License

[MIT](LICENSE) © [ZiZiGY](https://github.com/ZiZiGY)

---

<p align="center">Made with ❤️ for the Vue.js community</p>

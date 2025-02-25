# DragOverlay

Utility component for rendering drag preview overlay. While the library provides this component for convenient default drag visualization, it's completely optional - you can implement your own drag preview logic.

## Import

```ts
import { DragOverlay } from 'vue-dnd-hooks';
```

## Usage

### Basic Setup

```vue
<template>
  <DragOverlay />
</template>
```

Just mounting this component somewhere in your app will enable default drag previews. The component automatically handles:

- Rendering active drag layer
- Positioning preview elements
- Cleanup when drag ends

## Implementation

Here's how simple the default implementation is:

```vue
<!-- DragOverlay.vue -->
<script setup lang="ts">
  import { useDnDStore } from '../composables/useDnDStore';
  import DefaultOverlay from './DefaultOverlay.vue';

  const { isDragging, draggingElements } = useDnDStore();
</script>

<template>
  <DefaultOverlay v-if="isDragging && draggingElements.length" />
</template>
```

And the default overlay component:

```vue
<!-- DefaultOverlay.vue -->
<script setup lang="ts">
  import { computed } from 'vue';
  import { useDragContainer } from '../composables/useDragContainer';

  const { elementRef, pointerPosition, draggingElements } = useDragContainer();

  const computedStyle = computed(() => ({
    transform: `translate3d(${
      (pointerPosition.current.value?.x ?? 0) -
      (pointerPosition.offset.pixel.value?.x ?? 0)
    }px, ${
      (pointerPosition.current.value?.y ?? 0) -
      (pointerPosition.offset.pixel.value?.y ?? 0)
    }px, 0)`,
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    transition: '0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
  }));
</script>

<template>
  <div
    v-if="draggingElements.length"
    ref="elementRef"
    :style="computedStyle"
  >
    <div
      v-for="(element, index) in draggingElements"
      :key="index"
      v-html="element.initialHTML"
      :style="{
        width: `${element.initialRect?.width}px`,
        height: `${element.initialRect?.height}px`,
      }"
    />
  </div>
</template>
```

### Custom Implementation

If you prefer your own drag preview logic, you don't need to use these components at all. You can create your own using the store:

```vue
<script setup lang="ts">
  import { useDnDStore } from 'vue-dnd-hooks';

  const { isDragging, draggingElements, pointerPosition } = useDnDStore();
</script>

<template>
  <div
    v-if="isDragging"
    class="my-custom-overlay"
  >
    <!-- Your custom drag preview implementation -->
  </div>
</template>
```

## Features

- Zero-config default drag preview
- Automatically handles drag layer rendering
- Uses fixed positioning for optimal performance
- Fully optional - can be replaced with custom logic
- Simple and transparent implementation

## Notes

- While optional, this is the easiest way to get drag previews working
- Uses fixed positioning to avoid layout shifts
- Supports multiple dragging elements
- Automatically matches original element dimensions
- Can be fully replaced with custom implementation

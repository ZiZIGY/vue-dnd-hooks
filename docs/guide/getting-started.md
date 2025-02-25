# Getting Started

## Installation

::: code-group

```bash
npm install vue-dnd-hooks
```

```bash
yarn add vue-dnd-hooks
```

```bash
pnpm add vue-dnd-hooks
```

:::

## Basic Usage

Here's a simple example of a draggable element:

```vue
<script setup lang="ts">
  import { useDrag } from 'vue-dnd-hooks';

  const { isDragging, elementRef } = useDrag({
    events: {
      onStart: () => {
        console.log('drag started');
      },
    },
  });
</script>

<template>
  <div
    ref="dragRef"
    :style="{
      opacity: isDragging ? 0.5 : 1,
    }"
  >
    Drag me!
  </div>
</template>
```

## Core Concepts

Vue DnD Hooks provides a simple yet powerful API for drag and drop operations:

### 1. useDrag

The main hook for making elements draggable. Provides:

- `elementRef`: Reference to attach to your draggable element
- `isDragging`: Current drag state
- Event callbacks for full control

```ts
const { isDragging, elementRef } = useDrag(options);
```

### 2. Event Handlers

Full control over the drag lifecycle:

- `onStart`: Called when dragging begins
- `onMove`: Called during dragging
- `onEnd`: Called when dragging ends

### 3. UseDrop

The hook for creating drop zones. Provides:

- `elementRef`: Reference to attach to your droppable element
- `isOver`: Whether a draggable is currently over the drop zone
- Event callbacks for drop interactions

```vue
<script setup lang="ts">
  import { useDrop } from 'vue-dnd-hooks';

  const { isOvered, elementRef } = useDrop({
    events: {
      onDrop: () => {
        console.log('Item dropped!', e);
      },
      onHover: () => {
        console.log('Draggable entered drop zone');
      },
      onLeave: () => {
        console.log('Draggable left drop zone');
      },
    },
  });
</script>

<template>
  <div
    ref="elementRef"
    :style="{
      backgroundColor: isOvered ? '#e9ecef' : 'transparent',
    }"
  >
    Drop here!
  </div>
</template>
```

Event handlers for drop zones:

- `onDrop`: Called when a draggable is dropped
- `onEnter`: Called when a draggable enters the drop zone
- `onLeave`: Called when a draggable leaves the drop zone

## Next Steps

- Check out the [Examples](/guide/getting-started) for more complex use cases
- Read the full [API documentation](/guide/getting-started)
- Learn about [Advanced Features](/guide/getting-started)

::: tip
Vue DnD Hooks is designed to be fully customizable. You have complete control over the dragging behavior and styling!
:::

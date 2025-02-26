# Custom Draggable Component

While vue-dnd-hooks provides low-level hooks for implementing drag and drop functionality, you might want to create reusable components. Here's an example of how to create a basic draggable component:

::: warning Important
Don't forget to add `<DragOverlay />` component to your app. It's required for rendering dragged elements.
:::

::: warning Important
The `data` property in `useDrag` should be wrapped in `computed` to ensure reactivity. By default, data only updates on component mount/unmount, and updates might not be caught in all cases. If you need data to remain static in these conditions, you can skip computed, but for most cases and to avoid potential issues, always wrap your data in computed:

```typescript
const props = defineProps<IDraggableProps<T>>();

const dragData = computed(() => props.data);

const { elementRef, handleDragStart /* ... */ } = useDrag({
  ...props,
  data: dragData, // Wrap in computed for proper reactivity
  events: {
    // ... events
  },
});
```

:::

::: code-group

```vue [Draggable.vue]
<script setup lang="ts" generic="T">
  import { computed, type Component } from 'vue';
  import { useDrag, useSelectionManager, type IDnDStore } from 'vue-dnd-hooks';

  interface IDraggableProps<T> {
    container?: Component;
    data?: T;
    groups?: string[];
  }

  const props = defineProps<IDraggableProps<T>>();

  const emit = defineEmits<{
    (e: 'start', store: IDnDStore): void;
    (e: 'move', store: IDnDStore): void;
    (e: 'end', store: IDnDStore): void;
    (e: 'hover', store: IDnDStore): void;
    (e: 'leave', store: IDnDStore): void;
  }>();

  const dragData = computed(() => props.data);

  const {
    elementRef,
    handleDragStart,
    isAllowed,
    isDragging,
    isOvered,
    pointerPosition,
  } = useDrag({
    ...props,
    data: dragData,
    events: {
      onHover: (store: IDnDStore) => emit('hover', store),
      onLeave: (store: IDnDStore) => emit('leave', store),
      onStart: (store: IDnDStore) => emit('start', store),
      onMove: (store: IDnDStore) => emit('move', store),
      onEnd: (store: IDnDStore) => emit('end', store),
    },
  });

  const { isSelected, handleToggleSelect } = useSelectionManager(elementRef);
</script>

<template>
  <div ref="elementRef">
    <slot
      :handleDragStart="handleDragStart"
      :isAllowed="isAllowed"
      :isDragging="isDragging"
      :isOvered="isOvered"
      :pointerPosition="pointerPosition"
      :isSelected="isSelected"
      :handleToggleSelect="handleToggleSelect"
    />
  </div>
</template>
```

```vue [Usage.vue]
<script setup lang="ts">
  import Draggable from './components/Draggable.vue';
  import { DragOverlay } from 'vue-dnd-hooks';

  interface ItemData {
    id: number;
    title: string;
  }

  const itemData: ItemData = {
    id: 1,
    title: 'Draggable Item',
  };
</script>

<template>
  <!-- DragOverlay component is required for rendering dragged content -->
  <DragOverlay />

  <Draggable
    :data="itemData"
    :groups="['items']"
  >
    <template
      #default="{ isDragging, isSelected, handleToggleSelect, handleDragStart }"
    >
      <div class="draggable-item">
        <!-- Selection control -->
        <input
          type="checkbox"
          :checked="isSelected"
          @change="handleToggleSelect"
        />

        <!-- Drag handle -->
        <div
          class="drag-handle"
          @pointerdown="handleDragStart"
        >
          ⋮⋮
        </div>

        <!-- Content -->
        <div :class="{ dragging: isDragging }">
          {{ itemData.title }}
        </div>
      </div>
    </template>
  </Draggable>
</template>

<style>
  /* Basic layout for draggable item */
  .draggable-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 1px solid #ddd;
  }

  /* Drag handle styling */
  .drag-handle {
    cursor: move;
    user-select: none;
  }

  /* Visual feedback during drag */
  .dragging {
    opacity: 0.5;
  }
</style>
```

:::

::: tip Best Practices

- Separate drag handle and selection controls to avoid event conflicts
- Use dedicated drag handle element for better UX
- Keep selection and drag functionality independent
- Use basic CSS instead of framework-specific classes
  :::

## Features

::: info Component Features

- Uses `useDrag` hook for drag functionality
- Uses `useSelectionManager` for multi-select support
- Provides a flexible slot API for customization
- Handles all necessary event forwarding
- Supports generic types for custom data
- Provides full TypeScript support
  :::

## API Reference

### Props

::: info Props
| Name | Type | Description |
| --- | --- | --- |
| `data` | `T` | Custom data associated with the draggable element |
| `groups` | `string[]` | Groups this draggable belongs to |
| `container` | `Component` | Optional custom container component |
:::

### Events

::: info Events
| Name | Parameters | Description |
| --- | --- | --- |
| `start` | `(store: IDnDStore)` | Emitted when drag starts |
| `move` | `(store: IDnDStore)` | Emitted during dragging |
| `end` | `(store: IDnDStore)` | Emitted when drag ends |
| `hover` | `(store: IDnDStore)` | Emitted when another draggable hovers |
| `leave` | `(store: IDnDStore)` | Emitted when hover ends |
:::

### Slot Props

::: info Slot Props
| Name | Type | Description |
| --- | --- | --- |
| `handleDragStart` | `(e: PointerEvent) => void` | Function to initiate dragging |
| `isAllowed` | `boolean` | Whether dragging is allowed |
| `isDragging` | `boolean` | Whether element is being dragged |
| `isOvered` | `boolean` | Whether element is being hovered by another draggable |
| `isSelected` | `boolean` | Whether element is selected |
| `handleToggleSelect` | `() => void` | Function to toggle selection |
| `pointerPosition` | `IPointerPosition` | Current pointer position information |
:::

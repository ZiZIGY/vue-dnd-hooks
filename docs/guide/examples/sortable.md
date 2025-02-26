# Sortable List Component

This example demonstrates how to create a sortable list with visual indicators for item positioning. It combines both draggable and droppable functionality to create a smooth sorting experience.

::: warning Important
Remember that `<DragOverlay />` component should be present in your app for drag and drop functionality to work properly.
:::

::: code-group

```vue [SortableList.vue]
<script setup lang="ts">
  import { ref } from 'vue';
  import Draggable from './components/Draggable.vue';
  import Droppable from './components/Droppable.vue';
  import { DragOverlay, type IDnDStore } from 'vue-dnd-hooks';

  interface Item {
    id: number;
    title: string;
  }

  interface IData {
    index: number;
    items: Item[];
  }

  const items = ref<Item[]>([
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
  ]);

  const handleDrop = (store: IDnDStore) => {
    if (!store.hovered.element.value) return;

    const [draggingElement] = store.draggingElements.value;
    const { index, items } = draggingElement.data as IData;

    const [removedItem] = items.splice(index, 1);

    const { element } = store.hovered;
    const { index: targetIndex, items: targetItems } = element.value
      ?.data as IData;

    targetItems.splice(targetIndex, 0, removedItem);
  };
</script>

<template>
  <DragOverlay />

  <Droppable
    :groups="['sortable']"
    class="sortable-list"
    @drop="handleDrop"
  >
    <div class="list-container">
      <Draggable
        v-for="(item, index) in items"
        :key="index"
        :data="{ index, items }"
        :groups="['sortable']"
        v-slot="{ isDragging, handleDragStart, isOvered }"
      >
        <div
          v-if="isOvered"
          class="insert-indicator"
        />
        <div
          class="list-item"
          :class="{ dragging: isDragging }"
        >
          <span
            class="drag-handle"
            @pointerdown="handleDragStart"
            >⋮⋮</span
          >
          <span>{{ item.title }}</span>
        </div>
      </Draggable>
    </div>
  </Droppable>
</template>

<style>
  .sortable-list {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .list-container {
    padding: 12px;
    border: 2px dashed #ccc;
    border-radius: 8px;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    margin: 4px 0;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  .list-item.dragging {
    opacity: 0.5;
  }

  .drag-handle {
    cursor: move;
    user-select: none;
    color: #999;
  }

  .insert-indicator {
    height: 2px;
    width: 100%;
    background-color: #2196f3;
    margin: 4px 0;
    transition: all 0.2s ease;
  }
</style>
```

:::

## Key Features

::: info Component Features

- Simple and efficient sorting mechanism
- Visual insertion indicator
- Type-safe data handling
- Smooth drag and drop experience
- Automatic position tracking
  :::

## How It Works

### Data Structure

The component uses two main interfaces for type safety:

```typescript
interface Item {
  id: number;
  title: string;
}

interface IData {
  index: number;
  items: Item[];
}
```

The `IData` interface is crucial as it provides:

- Current item's index
- Reference to the array containing the item

### Drop Handling

The drop handler performs these steps:

1. Extracts dragged item's data and position
2. Removes item from original position
3. Gets target position from hovered element
4. Inserts item at new position

```typescript
const handleDrop = (store: IDnDStore) => {
  const [draggingElement] = store.draggingElements.value;
  const { index, items } = draggingElement.data as IData;

  const [removedItem] = items.splice(index, 1);

  const { element } = store.hovered;
  const { index: targetIndex, items: targetItems } = element.value
    ?.data as IData;

  targetItems.splice(targetIndex, 0, removedItem);
};
```

### Visual Feedback

The component provides visual feedback through:

- Insert indicator when hovering over drop positions
- Opacity change for dragged items
- Smooth transitions for all visual changes

## Best Practices

::: tip Best Practices

- Use `isOvered` for showing insertion indicators
- Pass both index and items array in draggable data
- Use type-safe interfaces for data handling
- Provide clear visual feedback during drag operations
- Keep the drop handling logic simple and direct
  :::

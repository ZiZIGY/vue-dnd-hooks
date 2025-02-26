# Nested Sortable List

This example demonstrates how to create a nested sortable list with unlimited depth levels. Each item can contain children items, and all items can be dragged and dropped between different levels.

::: warning Important
Remember that `<DragOverlay />` component should be present in your app for drag and drop functionality to work properly.
:::

::: tip
The nested sortable list allows for unlimited nesting levels and provides smooth drag and drop functionality between any levels of the hierarchy.
:::

## Usage

::: code-group

```vue [NestedList.vue]
<script setup lang="ts" generic="T">
  import type { IDnDStore } from 'vue-dnd-hooks';
  import Draggable from './Draggable.vue';
  import Droppable from './Droppable.vue';

  interface NestedItem {
    id: number;
    title: string;
    children?: NestedItem[];
  }

  interface IData {
    index: number;
    items: NestedItem[];
  }

  defineProps<{
    items: NestedItem[];
  }>();

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
  <Droppable
    :groups="['nested']"
    class="nested-list"
    @drop="handleDrop"
  >
    <div class="list-container">
      <template
        v-for="(item, index) in items"
        :key="item.id"
      >
        <Draggable
          :data="{ index, items }"
          :groups="['nested']"
        >
          <template #default="{ isDragging, handleDragStart, isOvered }">
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

            <div
              v-if="item.children"
              class="nested-container"
            >
              <NestedList :items="item.children" />
            </div>
          </template>
        </Draggable>
      </template>
    </div>
  </Droppable>
</template>

<style>
  .nested-list {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .list-container {
    padding: 12px;
    border: 2px dashed #ccc;
    border-radius: 8px;
  }

  .nested-container {
    margin-left: 24px;
    margin-top: 8px;
    padding: 8px;
    border-left: 2px solid #eee;
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

```vue [Usage.vue]
<script setup lang="ts">
  import { ref } from 'vue';
  import NestedList from './components/NestedList.vue';
  import { DragOverlay } from 'vue-dnd-hooks';

  interface NestedItem {
    id: number;
    title: string;
    children?: NestedItem[];
  }

  const items = ref<NestedItem[]>([
    {
      id: 1,
      title: 'Item 1',
      children: [
        { id: 5, title: 'Item 1.1' },
        { id: 6, title: 'Item 1.2' },
      ],
    },
    {
      id: 2,
      title: 'Item 2',
      children: [
        { id: 7, title: 'Item 2.1' },
        { id: 8, title: 'Item 2.2' },
      ],
    },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
  ]);
</script>

<template>
  <DragOverlay />
  <NestedList :items="items" />
</template>
```

:::

## Key Features

::: info Component Features

- Recursive component structure for unlimited nesting
- Drag and drop between any nesting levels
- Visual insertion indicators
- Type-safe data handling with TypeScript
- Smooth animations and transitions
  :::

## How It Works

The component uses a recursive structure where each `NestedList` can contain other `NestedList` components. The drag and drop functionality is handled through the `data` prop of the `Draggable` component, which contains:

```typescript
interface IData {
  index: number; // Position in current list
  items: NestedItem[]; // Reference to parent array
}
```

This structure allows for easy item movement between any levels of nesting, as each draggable item knows its exact position and parent array.

## Best Practices

::: tip Best Practices

- Use unique IDs for each item
- Keep the data structure flat and simple
- Provide visual feedback for drag operations
- Use TypeScript interfaces for type safety
- Implement smooth transitions for better UX
  :::

## Styling

The component includes essential styles for nested visualization:

```css
.nested-container {
  margin-left: 24px;
  margin-top: 8px;
  padding: 8px;
  border-left: 2px solid #eee;
}

.insert-indicator {
  height: 2px;
  width: 100%;
  background-color: #2196f3;
  margin: 4px 0;
  transition: all 0.2s ease;
}
```

These styles provide clear visual hierarchy and feedback during drag operations.

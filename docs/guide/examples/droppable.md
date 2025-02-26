# Custom Droppable Component

A reusable component for creating drop zones. This example demonstrates how to create a two-way drag and drop list system with proper type safety and position tracking.

::: warning Important
Remember that `<DragOverlay />` component should be present in your app for drag and drop functionality to work properly.
:::

::: tip
The `data` property in droppable is optional and serves as a utility. It can be useful in cases where you need to:

- Access additional data during drop handling when direct ref access is not possible
- Store temporary data during drag operations for special cases
- Share data between different drop zones

Like with draggable components, if you use `data`, it should be wrapped in `computed` for proper reactivity:

```typescript
const dropData = computed(() => props.data);

const { elementRef, isAllowed, isOvered } = useDrop({
  ...props,
  data: dropData,
  events: {
    // ... events
  },
});
```

:::

::: code-group

```vue [Droppable.vue]
<script setup lang="ts" generic="T">
  import { computed } from 'vue';
  import { useDrop, type IDnDStore } from 'vue-dnd-hooks';

  interface IDroppableProps<T> {
    groups?: string[];
    data?: T;
  }

  const props = defineProps<IDroppableProps<T>>();

  const emit = defineEmits<{
    (e: 'drop', store: IDnDStore): void;
    (e: 'hover', store: IDnDStore): void;
    (e: 'leave', store: IDnDStore): void;
  }>();

  const dropData = computed(() => props.data);

  const { elementRef, isAllowed, isOvered } = useDrop({
    ...props,
    data: dropData,
    events: {
      onDrop: (store: IDnDStore) => emit('drop', store),
      onHover: (store: IDnDStore) => emit('hover', store),
      onLeave: (store: IDnDStore) => emit('leave', store),
    },
  });
</script>

<template>
  <div ref="elementRef">
    <slot
      :is-allowed="isAllowed"
      :is-overed="isOvered"
    />
  </div>
</template>
```

```vue [Usage.vue]
<script setup lang="ts">
  import { ref } from 'vue';
  import Draggable from './components/Draggable.vue';
  import Droppable from './components/Droppable.vue';
  import { DragOverlay, type IDnDStore } from 'vue-dnd-hooks';

  interface Item {
    id: number;
    title: string;
    listId: 'source' | 'target';
    index: number;
  }

  type ListId = 'source' | 'target';

  // Source list items
  const sourceItems = ref<Item[]>([
    { id: 1, title: 'Item 1', listId: 'source', index: 0 },
    { id: 2, title: 'Item 2', listId: 'source', index: 1 },
    { id: 3, title: 'Item 3', listId: 'source', index: 2 },
  ]);

  // Target list items
  const targetItems = ref<Item[]>([]);

  // Update indices after any changes
  const updateIndices = (items: Item[], listId: ListId): void => {
    items.forEach((item, index) => {
      item.index = index;
      item.listId = listId;
    });
  };

  // Handle drop for any list
  const handleDrop = (store: IDnDStore, targetListId: ListId): void => {
    const draggedItems = store.draggingElements.value.map(
      (el) => el.data as Item
    );
    const sourceListId = draggedItems[0].listId;

    // Skip if dropping in the same list
    if (sourceListId === targetListId) return;

    // Add to target list
    if (targetListId === 'source') {
      sourceItems.value.push(...draggedItems);
      updateIndices(sourceItems.value, 'source');

      // Remove from target list
      targetItems.value = targetItems.value.filter(
        (item) =>
          !draggedItems.some((draggedItem) => draggedItem.id === item.id)
      );
      updateIndices(targetItems.value, 'target');
    } else {
      targetItems.value.push(...draggedItems);
      updateIndices(targetItems.value, 'target');

      // Remove from source list
      sourceItems.value = sourceItems.value.filter(
        (item) =>
          !draggedItems.some((draggedItem) => draggedItem.id === item.id)
      );
      updateIndices(sourceItems.value, 'source');
    }
  };
</script>

<template>
  <DragOverlay />

  <div class="container">
    <!-- Source List -->
    <div class="list-container">
      <h3>Source List</h3>
      <Droppable
        :groups="['items']"
        class="drop-zone"
        @drop="(store) => handleDrop(store, 'source')"
      >
        <template #default="{ isOvered, isAllowed }">
          <div
            class="drop-zone-content"
            :class="{
              'drop-zone-over': isOvered,
              'drop-zone-allowed': isOvered && isAllowed,
              'drop-zone-forbidden': isOvered && !isAllowed,
            }"
          >
            <Draggable
              v-for="item in sourceItems"
              :key="item.id"
              :data="item"
              :groups="['items']"
            >
              <template #default="{ isDragging, handleDragStart }">
                <div
                  class="draggable-item"
                  :class="{ dragging: isDragging }"
                >
                  <span
                    class="drag-handle"
                    @pointerdown="handleDragStart"
                    >⋮⋮</span
                  >
                  <span>{{ item.title }}</span>
                </div>
              </template>
            </Draggable>

            <div
              v-if="!sourceItems.length"
              class="empty-message"
            >
              Drop items here
            </div>
          </div>
        </template>
      </Droppable>
    </div>

    <!-- Target List -->
    <div class="list-container">
      <h3>Target List</h3>
      <Droppable
        :groups="['items']"
        class="drop-zone"
        @drop="(store) => handleDrop(store, 'target')"
      >
        <template #default="{ isOvered, isAllowed }">
          <div
            class="drop-zone-content"
            :class="{
              'drop-zone-over': isOvered,
              'drop-zone-allowed': isOvered && isAllowed,
              'drop-zone-forbidden': isOvered && !isAllowed,
            }"
          >
            <Draggable
              v-for="item in targetItems"
              :key="item.id"
              :data="item"
              :groups="['items']"
            >
              <template #default="{ isDragging, handleDragStart }">
                <div
                  class="draggable-item"
                  :class="{ dragging: isDragging }"
                >
                  <span
                    class="drag-handle"
                    @pointerdown="handleDragStart"
                    >⋮⋮</span
                  >
                  <span>{{ item.title }}</span>
                </div>
              </template>
            </Draggable>

            <div
              v-if="!targetItems.length"
              class="empty-message"
            >
              Drop items here
            </div>
          </div>
        </template>
      </Droppable>
    </div>
  </div>
</template>

<style>
  /* Basic layout for container */
  .container {
    display: flex;
    gap: 24px;
    padding: 16px;
  }

  .list-container {
    flex: 1;
    min-width: 250px;
  }

  .list-container h3 {
    margin-bottom: 12px;
    color: #666;
  }

  /* Drop zone styling */
  .drop-zone {
    height: 100%;
    min-height: 200px;
  }

  .drop-zone-content {
    height: 100%;
    padding: 12px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .drop-zone-over {
    transform: scale(1.02);
  }

  .drop-zone-allowed {
    border-color: #4caf50;
    background: rgba(76, 175, 80, 0.1);
  }

  .drop-zone-forbidden {
    border-color: #f44336;
    background: rgba(244, 67, 54, 0.1);
  }

  /* Draggable item styling */
  .draggable-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    margin-bottom: 8px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .draggable-item:hover {
    background: #f5f5f5;
  }

  .dragging {
    opacity: 0.5;
    transform: scale(0.98);
  }

  .drag-handle {
    cursor: move;
    user-select: none;
    color: #999;
  }

  .empty-message {
    color: #999;
    text-align: center;
    padding: 24px;
  }
</style>
```

:::

::: tip Best Practices

- Track item position using data properties (`listId` and `index`)
- Prevent duplicate items by checking source and target lists
- Use type-safe store operations with `IDnDStore`
- Provide visual feedback for different drop states
- Keep lists synchronized with proper index management
- Handle empty states gracefully
  :::

## Features

::: info Component Features

- Uses `useDrop` hook for drop zone functionality
- Provides visual feedback for different states
- Handles drop events with proper type safety
- Supports generic types for custom data
- Maintains item positions across lists
- Prevents duplicate items during drag and drop
  :::

## API Reference

### Props

::: info Props
| Name | Type | Description |
| --- | --- | --- |
| `data` | `T` | Custom data associated with the drop zone |
| `groups` | `string[]` | Groups this drop zone accepts |
:::

### Events

::: info Events
| Name | Parameters | Description |
| --- | --- | --- |
| `drop` | `(store: IDnDStore)` | Emitted when items are dropped |
| `hover` | `(store: IDnDStore)` | Emitted when draggable hovers |
| `leave` | `(store: IDnDStore)` | Emitted when draggable leaves |
:::

### Slot Props

::: info Slot Props
| Name | Type | Description |
| --- | --- | --- |
| `isAllowed` | `boolean` | Whether current draggable can be dropped |
| `isOvered` | `boolean` | Whether drop zone is being hovered |
:::

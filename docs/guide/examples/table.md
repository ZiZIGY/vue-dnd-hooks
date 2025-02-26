# Table Component

This example demonstrates how to create a sortable table with drag and drop functionality for rows reordering.

::: warning Important
Remember that `<DragOverlay />` component should be present in your app for drag and drop functionality to work properly.
:::

::: code-group

```vue [DraggableTableRow.vue]
<script setup lang="ts" generic="T">
  import { computed, type Component } from 'vue';
  import { useDrag, useSelectionManager, type IDnDStore } from 'vue-dnd-hooks';

  interface IDraggableTableRowProps<T> {
    container?: Component;
    data?: T;
    groups?: string[];
  }

  const props = defineProps<IDraggableTableRowProps<T>>();

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
  <tr
    v-if="isOvered"
    class="insert-indicator"
  >
    <td colspan="4"></td>
  </tr>
  <tr ref="elementRef">
    <slot
      :handleDragStart="handleDragStart"
      :isAllowed="isAllowed"
      :isDragging="isDragging"
      :isOvered="isOvered"
      :pointerPosition="pointerPosition"
      :isSelected="isSelected"
      :handleToggleSelect="handleToggleSelect"
    />
  </tr>
</template>

<style>
  .insert-indicator {
    padding: 0;
    background-color: #2196f3;
  }
</style>
```

```vue [Usage.vue]
<script setup lang="ts">
  import { ref } from 'vue';
  import { DragOverlay, type IDnDStore } from 'vue-dnd-hooks';
  import DraggableTableRow from './components/DraggableTableRow.vue';
  import Droppable from './components/Droppable.vue';

  interface TableRow {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  interface IData {
    index: number;
    items: TableRow[];
  }

  const items = ref<TableRow[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
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
  <div>
    <DragOverlay />

    <Droppable
      :groups="['table-rows']"
      class="sortable-table"
      @drop="handleDrop"
    >
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(item, index) in items"
            :key="item.id"
          >
            <DraggableTableRow
              :data="{ index, items }"
              :groups="['table-rows']"
              v-slot="{ handleDragStart }"
            >
              <td>
                <span
                  class="drag-handle"
                  @pointerdown="handleDragStart"
                  >⋮⋮</span
                >
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.role }}</td>
            </DraggableTableRow>
          </template>
        </tbody>
      </table>
    </Droppable>
  </div>
</template>

<style>
  .sortable-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  .sortable-table th,
  .sortable-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  .sortable-table th {
    background: #f5f5f5;
    font-weight: 600;
  }

  .checkbox-cell {
    width: 40px;
  }

  .drag-handle {
    cursor: move;
    user-select: none;
    color: #999;
    margin-right: 8px;
  }

  tr.insert-indicator td {
    padding: 0;
    border-top: 2px solid #2196f3;
  }

  tr[data-dragging='true'] {
    opacity: 0.5;
    background: #f5f5f5;
  }
</style>

```

:::

## Key Features

::: info Component Features

- Table-specific drag and drop functionality
- Row selection support
- Visual insertion indicators
- Proper table structure maintenance
- Type-safe data handling
  :::

## How It Works

### Data Structure

The component uses two main interfaces for type safety:

```typescript
interface TableRow {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface IData {
  index: number;
  items: TableRow[];
}
```

### Drop Handling

The drop handler performs these steps:

1. Extracts dragged item's data and position
2. Removes item from original position
3. Gets target position from hovered element
4. Inserts item at new position

### Visual Feedback

The component provides visual feedback through:

- Insert indicator when hovering between rows
- Opacity change for dragged rows
- Proper table structure maintenance during drag operations

## Best Practices

::: tip Best Practices

- Use proper table semantics with `<thead>` and `<tbody>`
- Maintain table structure during drag operations
- Provide clear visual feedback for drag operations
- Handle selection separately from drag functionality
- Keep the drop handling logic simple and direct
  :::

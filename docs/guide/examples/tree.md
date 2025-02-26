# Sortable Tree

This example demonstrates how to create a sortable tree component with expandable/collapsible nodes. Items can be dragged and dropped between different branches of the tree.

::: warning Important
Remember that `<DragOverlay />` component should be present in your app for drag and drop functionality to work properly.
:::

::: tip
The tree component supports unlimited nesting levels and provides intuitive controls for expanding/collapsing nodes while maintaining consistent drag and drop behavior.
:::

## Usage

::: code-group

```vue [Tree.vue]
<script setup lang="ts" generic="T">
  import { ref } from 'vue';
  import type { IDnDStore } from 'vue-dnd-hooks';
  import Draggable from './Draggable.vue';
  import Droppable from './Droppable.vue';

  interface TreeItem {
    id: number;
    title: string;
    children?: TreeItem[];
  }

  interface IData {
    index: number;
    items: TreeItem[];
  }

  const props = defineProps<{
    items: TreeItem[];
  }>();

  // Store expanded node states
  const expandedNodes = ref<Set<number>>(new Set());

  const toggleNode = (id: number) => {
    if (expandedNodes.value.has(id)) {
      expandedNodes.value.delete(id);
    } else {
      expandedNodes.value.add(id);
    }
  };

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
    :groups="['tree']"
    class="tree-list"
    @drop="handleDrop"
  >
    <div class="tree-container">
      <template
        v-for="(item, index) in items"
        :key="item.id"
      >
        <Draggable
          :data="{ index, items }"
          :groups="['tree']"
        >
          <template #default="{ isDragging, handleDragStart, isOvered }">
            <div
              v-if="isOvered"
              class="insert-indicator"
            />
            <div
              class="tree-item"
              :class="{
                dragging: isDragging,
                'tree-item-over': isOvered,
              }"
            >
              <span
                v-if="item.children?.length"
                class="expand-icon"
                @click="toggleNode(item.id)"
              >
                {{ expandedNodes.has(item.id) ? '▼' : '▶' }}
              </span>
              <span
                v-else
                class="expand-icon placeholder"
              >
                ●
              </span>

              <span
                class="drag-handle"
                @pointerdown="handleDragStart"
              >
                ⋮⋮
              </span>

              <span class="item-title">{{ item.title }}</span>
            </div>

            <div
              v-if="item.children && expandedNodes.has(item.id)"
              class="tree-branch"
            >
              <Tree :items="item.children" />
            </div>
          </template>
        </Draggable>
      </template>
    </div>
  </Droppable>
</template>

<style>
  .tree-list {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .tree-container {
    padding: 12px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .tree-item {
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

  .tree-item:hover {
    background: #f5f5f5;
  }

  .tree-item.dragging {
    opacity: 0.5;
    transform: scale(0.98);
  }

  .tree-item-over {
    border-color: #4caf50;
    background: rgba(76, 175, 80, 0.1);
  }

  .tree-branch {
    margin-left: 24px;
    padding-left: 12px;
    border-left: 1px solid #e0e0e0;
  }

  .expand-icon {
    cursor: pointer;
    user-select: none;
    color: #999;
    font-size: 0.8em;
  }

  .expand-icon.placeholder {
    font-size: 0.5em;
    cursor: default;
    opacity: 0.5;
  }

  .drag-handle {
    cursor: move;
    user-select: none;
    color: #999;
  }

  .item-title {
    flex: 1;
  }

  .insert-indicator {
    height: 2px;
    background-color: #4caf50;
    margin: 2px 0;
    transition: all 0.2s ease;
  }
</style>
```

```vue [Usage.vue]
<script setup lang="ts">
  import { ref } from 'vue';
  import Tree from './components/Tree.vue';
  import { DragOverlay } from 'vue-dnd-hooks';

  interface TreeItem {
    id: number;
    title: string;
    children?: TreeItem[];
  }

  const items = ref<TreeItem[]>([
    {
      id: 1,
      title: 'Root 1',
      children: [
        {
          id: 2,
          title: 'Branch 1',
          children: [
            { id: 3, title: 'Leaf 1' },
            { id: 4, title: 'Leaf 2' },
          ],
        },
        { id: 5, title: 'Branch 2' },
      ],
    },
    {
      id: 6,
      title: 'Root 2',
      children: [
        { id: 7, title: 'Branch 3' },
        { id: 8, title: 'Branch 4' },
      ],
    },
  ]);
</script>

<template>
  <DragOverlay />
  <Tree :items="items" />
</template>
```

:::

## Key Features

::: info Component Features

- Expandable/collapsible tree nodes
- Drag and drop between any nodes
- Visual indicators for drag operations
- Consistent styling with other components
- Simple and intuitive interface
  :::

## How It Works

The tree component combines several key features:

1. Node Management:

```typescript
const expandedNodes = ref<Set<number>>(new Set());

const toggleNode = (id: number) => {
  if (expandedNodes.value.has(id)) {
    expandedNodes.value.delete(id);
  } else {
    expandedNodes.value.add(id);
  }
};
```

2. Drag and Drop Logic:

```typescript
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
```

## Best Practices

::: tip Best Practices

- Use unique IDs for each tree node
- Maintain clear visual hierarchy
- Provide visual feedback during drag operations
- Keep node expansion state separate from data
- Use consistent styling with other components
  :::

## Component Structure

The component is built with three main parts:

1. Node controls (expand/collapse)
2. Drag handle
3. Content area

Each part serves a specific purpose:

```vue
<div class="tree-item">
  <!-- Node control -->
  <span class="expand-icon">▶</span>
  
  <!-- Drag handle -->
  <span class="drag-handle">⋮⋮</span>
  
  <!-- Content -->
  <span class="item-title">{{ item.title }}</span>
</div>
```

This structure ensures a consistent and intuitive user interface while maintaining all necessary functionality.

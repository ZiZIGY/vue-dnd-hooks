# useSelectionManager

Hook for managing element selection in drag and drop interface. Provides built-in logic for handling nested selections.

## Import

```ts
import { useSelectionManager } from 'vue-dnd-hooks';
```

## Parameters

```ts
function useSelectionManager(elementRef: Ref<HTMLElement | null>): {
  handleUnselect: () => void;
  handleSelect: () => void;
  handleToggleSelect: () => void;
  isSelected: ComputedRef<boolean>;
  isParentOfSelected: ComputedRef<boolean>;
};
```

## Return Values

- `handleUnselect` - Removes the current element from selection
- `handleSelect` - Adds the current element to selection
- `handleToggleSelect` - Toggles selection state of the current element
- `isSelected` - Whether the current element is selected
- `isParentOfSelected` - Whether the current element contains any selected elements

## Nested Selection Logic

The selection manager automatically handles parent-child relationships to prevent invalid selection states:

1. When selecting a parent:

   - All selected children are automatically unselected
   - Prevents situations where both parent and children are selected

2. When selecting a child:
   - If the parent is selected, it will be automatically unselected
   - Ensures clear selection boundaries

## Basic Usage

```vue
<template>
  <div
    ref="elementRef"
    :class="{ 'is-selected': isSelected }"
    @click="handleToggleSelect"
  >
    Selectable Item
  </div>
</template>

<script setup lang="ts">
  import { useSelectionManager } from 'vue-dnd-hooks';

  const { elementRef } = useDrag();
  const { isSelected, handleToggleSelect } = useSelectionManager(elementRef);
</script>
```

## Features

- Automatic handling of parent-child selection relationships
- Prevention of invalid selection states
- Works with elements registered in DnD store
- Support for deeply nested structures

## Notes

- Works only with elements that are registered in DnD store (via useDrag)
- Parent elements cannot be selected if they have selected children
- Child elements are automatically unselected when parent is selected
- Selection state is managed through the global DnD store

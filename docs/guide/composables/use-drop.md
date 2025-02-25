# useDrop

A composable that creates a drop zone capable of accepting draggable elements with group-based validation.

## Import

```ts
import { useDrop } from 'vue-dnd-hooks';
```

## Type Declaration

```ts
interface IUseDropOptions {
  /** Groups this zone accepts */
  groups?: string[];

  /** Event handlers */
  events?: {
    /** Called when compatible element is dropped */
    onDrop?: (store: IDnDStore) => void;
    /** Called when element hovers over zone */
    onHover?: (store: IDnDStore) => void;
    /** Called when element leaves zone */
    onLeave?: (store: IDnDStore) => void;
  };

  /** Custom data attached to drop zone */
  data?: any;
}

interface UseDropReturn {
  elementRef: Ref<HTMLElement | null>;
  isOvered: ComputedRef<boolean>;
  isAllowed: ComputedRef<boolean>;
}
```

## Options

### groups

Optional array of group names that this drop zone accepts. Elements can only be dropped if they share at least one group with the zone.

### events

Event handlers for drop zone states:

- `onDrop`: Called when a compatible element is dropped
- `onHover`: Called when an element hovers over the zone
- `onLeave`: Called when an element leaves the zone

### data

Optional custom data to attach to the drop zone, accessible in event handlers.

## Return Values

### elementRef

A template ref that must be attached to the drop zone element.

### isOvered

A computed ref indicating if the zone is currently being hovered by a dragged element.

### isAllowed

A computed ref indicating if the currently dragged element can be dropped based on group compatibility.

## Example

```vue
<script setup lang="ts">
  import { useDrop } from 'vue-dnd-hooks';

  const { elementRef, isOvered, isAllowed } = useDrop({
    groups: ['items'],
    events: {
      onDrop: (store) => {
        const droppedElements = store.draggingElements.value;
        console.log('Elements dropped!', droppedElements);
      },
      onHover: (store) => {
        if (isAllowed.value) {
          console.log('Compatible element hovering!');
        }
      },
      onLeave: () => {
        console.log('Element left drop zone');
      },
    },
    data: {
      zoneId: 'main-drop-zone',
      acceptLimit: 5,
    },
  });
</script>

<template>
  <div
    ref="elementRef"
    :class="{
      'drop-zone': true,
      'zone-hovered': isOvered,
      'drop-allowed': isAllowed && isOvered,
      'drop-forbidden': !isAllowed && isOvered,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
  .drop-zone {
    border: 2px dashed #ccc;
    padding: 20px;
    transition: all 0.3s;
  }

  .zone-hovered {
    background: #f0f0f0;
  }

  .drop-allowed {
    border-color: #4caf50;
    background: #e8f5e9;
  }

  .drop-forbidden {
    border-color: #f44336;
    background: #ffebee;
  }
</style>
```

## Details

The `useDrop` composable creates a drop zone that can accept dragged elements. It handles:

- Drop zone registration/unregistration
- Group-based compatibility checking
- Hover state tracking
- Drop event handling

Drop zones automatically register themselves with the drag and drop system when mounted and unregister when unmounted.

The `isOvered` and `isAllowed` computed values can be used to style the drop zone based on the current drag state and compatibility with dragged elements.

Event handlers receive the full drag-and-drop store which includes:

- Currently dragged elements
- Pointer position information
- Hover states
- Other drop zones

This allows for complex drop logic based on the entire drag and drop state.

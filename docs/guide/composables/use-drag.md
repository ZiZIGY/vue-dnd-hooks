# useDrag

A composable that adds drag functionality to an element with advanced collision detection and multi-selection support.

## Import

```ts
import { useDrag } from 'vue-dnd-hooks';
```

## Type Declaration

```ts
interface IUseDragOptions {
  /** Groups this element belongs to */
  groups?: string[];

  /** Event handlers */
  events?: {
    /** Called when drag starts */
    onStart?: (store: IDnDStore) => void;
    /** Called during drag */
    onMove?: (store: IDnDStore) => void;
    /** Called when drag ends */
    onEnd?: (store: IDnDStore) => void;
    /** Called when hovering over element */
    onHover?: (store: IDnDStore) => void;
    /** Called when leaving element */
    onLeave?: (store: IDnDStore) => void;
  };

  /** Custom data attached to draggable */
  data?: any;

  /** Custom layer component for drag preview */
  layer?: Component | null;

  /** Container component */
  container?: Component;
}

interface UseDragReturn {
  isDragging: ComputedRef<boolean>;
  isOvered: ComputedRef<boolean>;
  isAllowed: ComputedRef<boolean>;
  elementRef: Ref<HTMLElement | null>;
  pointerPosition: {
    start: Ref<{ x: number; y: number } | null>;
    current: Ref<{ x: number; y: number } | null>;
    offset: {
      pixel: Ref<{ x: number; y: number } | null>;
      percent: Ref<{ x: number; y: number } | null>;
    };
  };
  handleDragStart: (e: PointerEvent) => void;
}
```

## Options

### groups

Optional array of group names for controlling drag & drop compatibility.

### events

Event handlers for drag operations:

- `onStart`: Called when dragging begins
- `onMove`: Called during dragging
- `onEnd`: Called when dragging ends
- `onHover`: Called when another draggable hovers over this element
- `onLeave`: Called when another draggable leaves this element

### data

Optional custom data to attach to the draggable element.

### layer

Optional Vue component to use as custom drag layer/preview.

### container

Optional container component for the draggable.

## Return Values

### pointerPosition

Object containing drag coordinates:

- `start`: Initial pointer position
- `current`: Current pointer position
- `offset`: Both pixel and percentage offsets from the element

### elementRef

A template ref that must be attached to the draggable element.

### isDragging

A computed ref indicating if the element is currently being dragged.

### isOvered

A computed ref indicating if the element is being hovered over by another draggable.

### isAllowed

A computed ref indicating if the current drag operation is allowed based on group compatibility.

### handleDragStart

Event handler that must be attached to start drag operation (usually via @pointerdown).

## Example

```vue
<script setup lang="ts">
  import { useDrag } from 'vue-dnd-hooks';
  import DragPreview from './DragPreview.vue';

  const {
    isDragging,
    isOvered,
    isAllowed,
    elementRef,
    pointerPosition,
    handleDragStart,
  } = useDrag({
    groups: ['items'],
    layer: DragPreview,
    data: { id: 1, type: 'item' },
    events: {
      onStart: (store) => console.log('Started dragging'),
      onMove: (store) =>
        console.log('Moving at:', pointerPosition.current.value),
      onEnd: (store) => console.log('Ended dragging'),
    },
  });
</script>

<template>
  <div
    ref="elementRef"
    @pointerdown="handleDragStart"
    :class="{
      'opacity-50': isDragging,
      'bg-blue-100': isOvered && isAllowed,
    }"
  >
    Drag me!
  </div>
</template>
```

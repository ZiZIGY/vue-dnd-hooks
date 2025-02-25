# useDragContainer

A composable for creating custom drag containers that control how dragged elements are visualized and positioned during drag operations.

## Import

```ts
import { useDragContainer } from 'vue-dnd-hooks';
```

## Type Declaration

```ts
interface UseDragContainerReturn {
  elementRef: Ref<HTMLElement | null>;
  draggingElements: Ref<IDraggingElement[]>;
  pointerPosition: {
    start: Ref<IPoint | null>;
    current: Ref<IPoint | null>;
    offset: {
      percent: Ref<IPoint | null>;
      pixel: Ref<IPoint | null>;
    };
  };
  isDragging: ComputedRef<boolean>;
}
```

## Return Values

- `elementRef` - Reference that must be bound to container element
- `draggingElements` - Array of currently dragged elements
- `pointerPosition` - Current pointer coordinates and offsets
- `isDragging` - Whether drag operation is in progress

## Usage

The drag container allows you to fully customize how dragged elements are displayed and positioned. Here are some common use cases:

### Basic Container

```vue
<script setup>
  import { computed } from 'vue';
  import { useDragContainer } from 'vue-dnd-hooks';

  const { elementRef, pointerPosition, isDragging, draggingElements } =
    useDragContainer();

  // Default positioning relative to pointer
  const computedStyle = computed(() => ({
    transform: `translate3d(
    ${
      pointerPosition.current.value?.x - pointerPosition.offset.pixel.value?.x
    }px,
    ${
      pointerPosition.current.value?.y - pointerPosition.offset.pixel.value?.y
    }px,
    0
  )`,
  }));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isDragging"
      ref="elementRef"
      :style="computedStyle"
      class="custom-drag-container"
    >
      <div
        v-for="element in draggingElements"
        :key="element.node?.id"
        v-html="element.initialHTML"
      />
    </div>
  </Teleport>
</template>
```

### Custom Positioning Examples

#### Center-aligned Container

```vue
<script setup>
  const computedStyle = computed(() => ({
    transform: `translate3d(
    ${pointerPosition.current.value?.x - containerWidth / 2}px,
    ${pointerPosition.current.value?.y - containerHeight / 2}px,
    0
  )`,
  }));
</script>
```

#### Axis-constrained Movement

```vue
<script setup>
  // Only allow horizontal movement
  const computedStyle = computed(() => ({
    transform: `translate3d(
    ${
      pointerPosition.current.value?.x - pointerPosition.offset.pixel.value?.x
    }px,
    0,
    0
  )`,
  }));
</script>
```

## Integration with useDrag

You can specify a custom container component when using `useDrag`:

```vue
<!-- CustomDragContainer.vue -->
<script setup>
  import { useDragContainer } from 'vue-dnd-hooks';

  const { elementRef, isDragging, draggingElements } = useDragContainer();
</script>

<!-- Using with useDrag -->
<script setup>
  import CustomDragContainer from './CustomDragContainer.vue';

  const { elementRef: dragRef } = useDrag({
    container: CustomDragContainer,
    // ... other options
  });
</script>
```

## Notes

- The container automatically registers itself with the DnD store on mount
- You can access and modify the active container through `useDnDStore()`
- Different from `layer` option in `useDrag` which customizes individual dragged elements
- Container ref is used for collision detection between dragged elements
- Provides complete control over drag visualization and positioning logic

## Advanced Example

```vue
<script setup>
  import { computed } from 'vue';
  import { useDragContainer } from 'vue-dnd-hooks';

  const { elementRef, pointerPosition, isDragging, draggingElements } =
    useDragContainer();

  // Custom grid snapping
  const GRID_SIZE = 20;

  const snappedPosition = computed(() => ({
    x: Math.round(pointerPosition.current.value?.x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(pointerPosition.current.value?.y / GRID_SIZE) * GRID_SIZE,
  }));

  const computedStyle = computed(() => ({
    transform: `translate3d(
    ${snappedPosition.value.x}px,
    ${snappedPosition.value.y}px,
    0
  )`,
    transition: 'transform 0.1s ease',
  }));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isDragging"
      ref="elementRef"
      :style="computedStyle"
      class="custom-drag-container"
    >
      <div class="dragged-elements-wrapper">
        <div
          v-for="element in draggingElements"
          :key="element.node?.id"
          class="dragged-element"
          :style="{
            width: `${element.initialRect?.width}px`,
            height: `${element.initialRect?.height}px`,
          }"
        >
          <slot
            name="dragged-element"
            :element="element"
          >
            <div v-html="element.initialHTML" />
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
```

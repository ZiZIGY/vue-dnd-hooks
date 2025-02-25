# useDnDStore

Global store that manages the entire drag and drop state. While primarily used internally by the library, it can be accessed directly for advanced use cases.

## Import

```ts
import { useDnDStore } from 'vue-dnd-hooks';
```

## Type Declaration

```ts
interface IDnDStore {
  /** Flag indicating if dragging is in progress */
  isDragging: ComputedRef<boolean>;

  /** Active container where dragging occurs */
  activeContainer: {
    component: Ref<Component | null>;
    ref: Ref<HTMLElement | null>;
  };

  /** Array of all drag elements */
  elements: Ref<IDragElement[]>;

  /** Array of currently selected elements */
  selectedElements: Ref<IDragElement[]>;

  /** Array of elements being dragged */
  draggingElements: Ref<IDraggingElement[]>;

  /** Array of drop zones */
  zones: Ref<IDropZone[]>;

  /** Currently hovered elements */
  hovered: {
    zone: Ref<IDropZone | null>;
    element: Ref<IDragElement | null>;
  };

  /** Pointer position information */
  pointerPosition: {
    start: Ref<IPoint | null>;
    current: Ref<IPoint | null>;
    offset: {
      percent: Ref<IPoint | null>;
      pixel: Ref<IPoint | null>;
    };
  };
}

interface IPoint {
  x: number;
  y: number;
}

interface IDragElement {
  node: HTMLElement | null;
  groups: string[];
  layer: Component | null;
  defaultLayer: Component | null;
  data: any;
  events: {
    onHover?: (store: IDnDStore) => void;
    onLeave?: (store: IDnDStore) => void;
    onEnd?: (store: IDnDStore) => void;
  };
}

interface IDraggingElement extends IDragElement {
  initialHTML: string;
  initialRect?: DOMRect;
}

interface IDropZone {
  node: HTMLElement | null;
  groups: string[];
  data: any;
  events: {
    onHover?: (store: IDnDStore) => void;
    onLeave?: (store: IDnDStore) => void;
    onDrop?: (store: IDnDStore) => void;
  };
}
```

## Return Values

The store provides comprehensive access to the drag and drop system state:

### Drag State

- `isDragging: ComputedRef<boolean>` - Whether any drag operation is currently active
- `draggingElements: Ref<IDraggingElement[]>` - Array of elements currently being dragged
- `selectedElements: Ref<IDragElement[]>` - Array of selected elements (for multi-drag operations)

### Container State

- `activeContainer: { component: Ref<Component | null>, ref: Ref<HTMLElement | null> }` - References to the active drag container

### Elements and Zones

- `elements: Ref<IDragElement[]>` - All registered draggable elements
- `zones: Ref<IDropZone[]>` - All registered drop zones

### Hover State

```ts
hovered: {
  zone: Ref<IDropZone | null>; // Currently hovered drop zone
  element: Ref<IDragElement | null>; // Currently hovered draggable
}
```

### Pointer Position

```ts
pointerPosition: {
  current: Ref<IPoint | null>; // Current pointer coordinates
  start: Ref<IPoint | null>; // Initial drag start coordinates
  offset: {
    percent: Ref<IPoint | null>; // Offset as percentage
    pixel: Ref<IPoint | null>; // Offset in pixels
  }
}
```

## Example

```ts
import { useDnDStore } from 'vue-dnd-hooks';
import { watch } from 'vue';

const { isDragging, draggingElements, hovered, pointerPosition } =
  useDnDStore();

// Track drag operations
watch(isDragging, (dragging) => {
  if (dragging) {
    console.log('Drag started:', draggingElements.value);
  } else {
    console.log('Drag ended');
  }
});

// Custom hover logic
watch(
  () => hovered.zone.value,
  (zone) => {
    if (zone) {
      // Access zone data and implement custom behavior
      console.log('Hovering over zone:', zone.data);
    }
  }
);

// Track pointer movement
watch(
  () => pointerPosition.current.value,
  (pos) => {
    if (pos) {
      console.log('Pointer at:', pos.x, pos.y);
    }
  }
);
```

## Advanced Usage

While the store is primarily used internally, you can access it directly to:

- Implement custom drag and drop logic
- Track the drag and drop state for external integrations
- Add custom behaviors based on hover states
- Create advanced multi-drag operations
- Implement position-based calculations

## Notes

- The store uses a singleton pattern to ensure a single source of truth
- All state is reactive using Vue's ref and computed
- The store is automatically initialized on first use
- Changes to the store should generally be done through the provided composables (`useDrag`, `useDrop`) rather than directly

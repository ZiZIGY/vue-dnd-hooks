# Types

Core type definitions used throughout the vue-dnd-hooks library.

## Store Types

### IDnDStore

Main drag and drop state store interface.

```ts
interface IDnDStore {
  /** Flag indicating if dragging is in progress */
  isDragging: Ref<boolean>;
  /** Active container where dragging occurs */
  activeContainer: IActiveContainer;
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
  pointerPosition: IPointerPosition;
}
```

### IActiveContainer

Container component information.

```ts
interface IActiveContainer {
  /** Vue component reference */
  component: Ref<Component | null>;
  /** HTML element reference */
  ref: Ref<HTMLElement | null>;
}
```

### IPointerPosition

Pointer position tracking information.

```ts
interface IPointerPosition {
  /** Initial pointer position when drag starts */
  start: Ref<IPoint | null>;
  /** Current pointer position */
  current: Ref<IPoint | null>;
  /** Offset from start position */
  offset: {
    /** Offset in percentage */
    percent: Ref<IPoint | null>;
    /** Offset in pixels */
    pixel: Ref<IPoint | null>;
  };
}
```

## Element Types

### IDragElement

Base draggable element configuration.

```ts
interface IDragElement {
  /** DOM node reference */
  node: HTMLElement | Element | null;
  /** Groups this element belongs to */
  groups: string[];
  /** Custom layer component for dragging */
  layer: Component | null;
  /** Default layer component */
  defaultLayer: Component | null;
  /** Custom data associated with element */
  data: any;
  /** Event handlers */
  events: {
    onHover?: (store: IDnDStore) => void;
    onLeave?: (store: IDnDStore) => void;
    onEnd?: (store: IDnDStore) => void;
  };
}
```

### IDraggingElement

Extended interface for elements being dragged.

```ts
interface IDraggingElement extends IDragElement {
  /** Original HTML content */
  initialHTML: string;
  /** Original element dimensions */
  initialRect?: DOMRect;
}
```

### IDropZone

Drop zone configuration.

```ts
interface IDropZone {
  /** DOM node reference */
  node: HTMLElement | Element | null;
  /** Groups this zone accepts */
  groups: string[];
  /** Custom data associated with zone */
  data: any;
  /** Event handlers */
  events: {
    onHover?: (store: IDnDStore) => void;
    onLeave?: (store: IDnDStore) => void;
    onDrop?: (store: IDnDStore) => void;
  };
}
```

## Option Types

### IUseDragOptions

Options for draggable elements.

```ts
interface IUseDragOptions {
  /** Groups this element belongs to */
  groups?: string[];
  /** Event handlers */
  events?: {
    onEnd?: (store: IDnDStore) => void;
    onStart?: (store: IDnDStore) => void;
    onMove?: (store: IDnDStore) => void;
    onHover?: (store: IDnDStore) => void;
    onLeave?: (store: IDnDStore) => void;
  };
  /** Custom data */
  data?: any;
  /** Custom layer component */
  layer?: Component | null;
  /** Container component */
  container?: Component;
}
```

### IUseDropOptions

Options for drop zones.

```ts
interface IUseDropOptions {
  /** Accepted groups */
  groups?: string[];
  /** Event handlers */
  events?: {
    onDrop?: (store: IDnDStore) => void;
    onHover?: (store: IDnDStore) => void;
    onLeave?: (store: IDnDStore) => void;
  };
  /** Custom data */
  data?: any;
}
```

### IAutoScrollOptions

Options for auto-scroll functionality.

```ts
interface IAutoScrollOptions {
  /** Distance from edge to start auto-scrolling (px) */
  threshold?: number;
  /** Scrolling speed (px/frame) */
  speed?: number;
  /** Whether auto-scroll is disabled */
  disabled?: boolean;
}
```

## Utility Types

### IPoint

2D point coordinates.

```ts
interface IPoint {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}
```

### IBoundingBox

Element bounding box dimensions.

```ts
interface IBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  bottom: number;
  left: number;
  right: number;
  top: number;
}
```

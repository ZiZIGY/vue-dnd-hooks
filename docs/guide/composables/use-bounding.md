# useBounding

Hook for tracking element's bounding box in real-time. Uses ResizeObserver and MutationObserver to efficiently monitor element's size and position changes.

## Import

```ts
import { useBounding } from 'vue-dnd-hooks';
```

## Type Declaration

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

interface UseBoundingOptions {
  /** Reset values to 0 when element is null */
  reset?: boolean;
  /** Track window resize events */
  windowResize?: boolean;
  /** Track window scroll events */
  windowScroll?: boolean;
}
```

## Parameters

```ts
function useBounding(
  element: Ref<HTMLElement | null>,
  options?: UseBoundingOptions
): Ref<IBoundingBox>;
```

- `element` - Reference to the HTML element to track
- `options` - Configuration options
  - `reset` - Reset values when element is null (default: true)
  - `windowResize` - Listen to window resize events (default: true)
  - `windowScroll` - Listen to window scroll events (default: true)

## Example

```ts
import { useBounding } from 'vue-dnd-hooks';
import { ref, watch } from 'vue';

const element = ref<HTMLElement | null>(null);

// Basic usage
const rect = useBounding(element);

// With options
const rect = useBounding(element, {
  reset: true,
  windowResize: true,
  windowScroll: true,
});

// Track changes
watch(rect, (newRect) => {
  console.log('Element position:', newRect.x, newRect.y);
  console.log('Element size:', newRect.width, newRect.height);
});
```

## Features

- Real-time tracking of element's position and size
- Automatic cleanup of observers and event listeners
- Efficient updates using ResizeObserver
- Tracks style and class changes using MutationObserver
- Window resize and scroll event handling
- Zero values when element is null (configurable)

## Notes

- Uses `shallowRef` for better performance
- Automatically disconnects observers when element changes or component unmounts
- Updates on:
  - Element resize
  - Style changes
  - Class changes
  - Window resize (optional)
  - Window scroll (optional)
- All measurements are in pixels

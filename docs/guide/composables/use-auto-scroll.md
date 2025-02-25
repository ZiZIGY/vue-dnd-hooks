# useAutoScroll

Hook for automatic scrolling when the pointer approaches container edges. This is a universal utility that can be used for any pointer-based interactions, not limited to drag and drop operations.

## Import

```ts
import { useAutoScroll } from 'vue-dnd-hooks';
```

## Type Declaration

```ts
interface IAutoScrollOptions {
  /** Distance from edges in pixels where scrolling starts */
  threshold?: number;
  /** Scroll speed in pixels per frame */
  speed?: number;
  /** Flag to disable auto-scrolling */
  disabled?: boolean;
}

interface IPoint {
  x: number;
  y: number;
}
```

## Parameters

```ts
function useAutoScroll(
  container: Ref<HTMLElement | null>,
  point: Ref<IPoint | null>,
  options?: IAutoScrollOptions
): {
  isScrolling: Ref<boolean>;
};
```

- `container` - Reference to the scrollable container element
- `point` - Reference to the current pointer position
- `options` - Configuration object (optional)
  - `threshold` - Distance from edges to trigger scrolling (default: 50px)
  - `speed` - Scroll speed in pixels per frame (default: 10)
  - `disabled` - Enable/disable scrolling (default: false)

## Return Values

- `isScrolling: Ref<boolean>` - Flag indicating if auto-scroll is currently active

## Example

```ts
import { useAutoScroll } from 'vue-dnd-hooks';
import { ref } from 'vue';

// Basic usage
const container = ref<HTMLElement | null>(null);
const point = ref<IPoint | null>(null);
const { isScrolling } = useAutoScroll(container, point);

// With custom options
const options = {
  threshold: 100, // Start scrolling 100px from edges
  speed: 15, // Scroll 15px per frame
  disabled: false, // Enable/disable scrolling
};
const { isScrolling } = useAutoScroll(container, point, options);

// Track scrolling state
watch(isScrolling, (scrolling) => {
  if (scrolling) {
    console.log('Auto-scrolling active');
  }
});
```

## Features

- Smooth scrolling using RequestAnimationFrame
- Performance optimized with DOM reads caching
- Supports both horizontal and vertical scrolling
- Adjustable scroll speed and threshold
- FPS-based speed normalization
- Can be enabled/disabled dynamically

## Notes

- The scroll speed is automatically adjusted based on the frame rate to ensure consistent scrolling
- Scrolling stops automatically when:
  - The pointer moves away from edges
  - The point reference becomes null
  - The component is disabled
  - The container reference is invalid
- The hook cleans up all resources (RAF, cache) when stopped

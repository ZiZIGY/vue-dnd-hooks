# useElementSize

Hook for tracking element size changes. Uses ResizeObserver internally to efficiently monitor element dimensions.

## Import

```ts
import { useElementSize } from 'vue-dnd-hooks';
```

## Type Declaration

```ts
interface ElementSize {
  width: number;
  height: number;
}
```

## Parameters

```ts
function useElementSize(
  element: Ref<HTMLElement | null>,
  initialSize?: ElementSize
): {
  width: Ref<number>;
  height: Ref<number>;
};
```

- `element` - Reference to the HTML element to track
- `initialSize` - Initial dimensions (optional, default: `{ width: 0, height: 0 }`)

## Return Values

- `width: Ref<number>` - Current width of the element
- `height: Ref<number>` - Current height of the element

## Example

```ts
import { useElementSize } from 'vue-dnd-hooks';
import { ref } from 'vue';

// Basic usage
const element = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(element);

// With initial size
const { width, height } = useElementSize(element, {
  width: 100,
  height: 100,
});

// Track size changes
watch([width, height], ([newWidth, newHeight]) => {
  console.log(`Element size changed to ${newWidth}x${newHeight}`);
});
```

## Features

- Reactive size tracking using ResizeObserver
- Zero-dependency implementation
- Immediate size detection on mount
- Type-safe implementation
- Memory efficient using shallow refs

## Notes

- Size updates are provided in pixels
- Initial size defaults to 0x0 if not specified
- Size tracking starts immediately when the element reference is valid
- Uses Vue's shallow refs for better performance

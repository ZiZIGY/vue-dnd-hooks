# useGeometry

Hook for calculating geometric relationships between two points. This is an independent utility that can be used for any geometric calculations, commonly used with drag and drop operations but not limited to them.

## Import

```ts
import { useGeometry } from 'vue-dnd-hooks';
```

## Type Declaration

```ts
interface IPoint {
  x: number;
  y: number;
}

type Direction = 'up' | 'down' | 'left' | 'right' | null;
```

## Parameters

```ts
function useGeometry(
  pointA: Ref<IPoint | null>,
  pointB: Ref<IPoint | null>
): {
  delta: ComputedRef<IPoint>;
  direction: ComputedRef<Direction>;
  distance: ComputedRef<number>;
  angle: ComputedRef<number>;
};
```

## Return Values

- `delta: ComputedRef<IPoint>` - Vector between two points
- `direction: ComputedRef<Direction>` - Cardinal direction from pointA to pointB
- `distance: ComputedRef<number>` - Euclidean distance between points
- `angle: ComputedRef<number>` - Angle in degrees between points (0° is right, 90° is down)

## Examples

### Basic Usage

```ts
import { useGeometry } from 'vue-dnd-hooks';
import { ref } from 'vue';

const start = ref<IPoint>({ x: 0, y: 0 });
const end = ref<IPoint>({ x: 100, y: 100 });

const { delta, direction, distance, angle } = useGeometry(start, end);

// Results:
// delta -> { x: 100, y: 100 }
// direction -> "down"
// distance -> 141.42 (√(100² + 100²))
// angle -> 45
```

### With Mouse Movement

```ts
const mousePosition = ref<IPoint | null>(null);
const lastPosition = ref<IPoint | null>(null);

// Track mouse movement
window.addEventListener('mousemove', (e) => {
  lastPosition.value = mousePosition.value;
  mousePosition.value = { x: e.clientX, y: e.clientY };
});

const { direction, distance } = useGeometry(lastPosition, mousePosition);

// Log movement patterns
watch([direction, distance], ([dir, dist]) => {
  console.log(`Moving ${dir} for ${dist.toFixed(2)}px`);
});
```

### Gesture Detection

```ts
const startPoint = ref<IPoint | null>(null);
const currentPoint = ref<IPoint | null>(null);

const { angle, distance } = useGeometry(startPoint, currentPoint);

// Detect swipe gesture
watch(distance, (dist) => {
  if (dist > 50) {
    const swipeAngle = angle.value;
    if (swipeAngle > -45 && swipeAngle < 45) console.log('Swipe right');
    else if (swipeAngle > 45 && swipeAngle < 135) console.log('Swipe down');
    else if (swipeAngle > 135 || swipeAngle < -135) console.log('Swipe left');
    else console.log('Swipe up');
  }
});
```

## Features

- Real-time geometric calculations
- Cardinal direction detection
- Distance and angle calculations
- Vector (delta) computation
- Reactive updates

## Notes

- All calculations are performed reactively when either point changes
- Angles are in degrees for easier understanding (0° points right, angles increase clockwise)
- Direction is determined based on the dominant axis of movement
- Returns zero values when either point is null

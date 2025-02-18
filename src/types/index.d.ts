import type { Component, Ref } from 'vue';

export interface IDnDStore {
  isDragging: Ref<boolean>;
  activeContainer: IActiveContainer;
  elements: Ref<IDragElement[]>;
  selectedElements: Ref<IDragElement[]>;
  draggingElements: Ref<IDraggingElement[]>;
  zones: Ref<IDropZone[]>;
  hovered: {
    zone: Ref<IDropZone | null>;
    element: Ref<IDragElement | null>;
  };
  pointerPosition: IPointerPosition;
}

export interface IAutoScrollOptions {
  threshold?: number;
  speed?: number;
  disabled?: boolean;
}

export interface IActiveContainer {
  component: Ref<Component | null>;
  ref: Ref<HTMLElement | null>;
  rect: Ref<IBoundingBox | null>;
}

export interface IPointerPosition {
  start: Ref<IPoint | null>;
  current: Ref<IPoint | null>;
  offset: {
    percent: Ref<IPoint | null>;
    pixel: Ref<IPoint | null>;
  };
}

export interface IDragElement {
  node: HTMLElement | Element | null;
  groups: string[];
  layer: Component | null;
  defaultLayer: Component | null;
}

export interface IDraggingElement extends IDragElement {
  initialHTML: string;
  initialRect?: DOMRect;
}

export interface IDropZone {
  node: HTMLElement | Element | null;
  groups: string[];
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IUseDropOptions {
  groups?: string[];
  events?: {
    // onDrop?: (store: IDnDStore) => void;
    // onHover?: (store: IDnDStore) => void;
    // onLeave?: (store: IDnDStore) => void;
  };
}

export interface IUseDragOptions {
  groups?: string[];
  events?: {
    // onEnd?: () => void;
    // onStart?: () => void;
    // onMove?: () => void;
    // onScroll?: () => void;
    // onOver?: () => void;
  };
  layer?: Component | null;
  container?: Component;
}

export interface IBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  bottom: number;
  left: number;
  right: number;
  top: number;
}

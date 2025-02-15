import type { Component, Ref } from 'vue';

export interface IDnDStore {
  isDragging: Ref<boolean>;
  activeContainerName: Ref<string | null>;
  elements: Ref<IDragElement[]>;
  selectedElements: Ref<IDragElement[]>;
  draggingElements: Ref<IDragElement[]>;
  zones: Ref<IDropZone[]>;
  hovered: {
    zone: Ref<IDropZone | null>;
    element: Ref<IDragElement | null>;
  };
  dragContainers: Map<string, Component>;
  pointerPosition: IPointerPosition;
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

export interface IDropZone {
  node: HTMLElement | Element | null;
  groups: string[];
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IUseDragOptions {
  groups: string[];
  onEnd: () => {};
  layer: Component | null;
}

export interface IBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

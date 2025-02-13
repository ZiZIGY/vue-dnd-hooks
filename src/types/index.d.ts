export interface IDnDStore {
  isDragging: boolean;

  elements: IDragElement[];
  selectedElements: IDragElement[];
  draggingElements?: IDragElement[];
  zones: IDropZone[];
  pointerPosition?: IPointerPosition;
}

export interface IPointerPosition {
  start: IPoint;
  current: IPoint;
  delta: IPoint;
  offset: IPoint;
}

export interface IDragElement {
  node: HTMLElement | Element | null;
  groups: string[];
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
}

export interface IBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

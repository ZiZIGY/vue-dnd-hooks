import type { Component } from 'vue';

export interface IDnDStore extends IHotkeys {
  isDragging: boolean;
  draggingElements: Map<string, IElement>;
  elements: Map<string, IElement>;
  selectedElements: Map<string, IElement>;
  zones: Map<string, IDropZone>;
  coordinates?: ICoordinates;
  offset: IOffset;
  hovered: IHovered;
}

export interface IElement<T = any> {
  node: HTMLElement | Element | null;
  defaultOuterHTML: string;
  group: string[];
  layer?: Component | null;
  defaultLayer?: Component | null;
  state: T;
  parentId: string | null;
  onEnd?: (store: IDnDStore, state?: T) => void;
}

export interface IHovered {
  elementId: string | null;
  zoneId: string | null;
}

export interface IDropZone<T = any> {
  node: HTMLElement | Element | null;
  group: string[];
  state?: T;
  onDrop?: (store: IDnDStore, state?: T) => void;
  onHover?: (store: IDnDStore, state?: T) => void;
  onLeave?: (store: IDnDStore, state?: T) => void;
}

export interface IOffset extends ICoordinates {
  percentX: number;
  percentY: number;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IHotkeys {
  isCtrlPressed: boolean;
  isShiftPressed: boolean;
  isAltPressed: boolean;
}

export interface IUseElementOptions<T> {
  id?: string;
  layer?: IElement['layer'];
  group?: IElement['group'];
  parentId?: string;
  state?: T;
  events?: {
    onEnd?: (store: IDnDStore, state?: T) => void;
  };
}
export interface IUseDropOptions<T = any> {
  id?: string;
  group?: string[];
  events?: {
    onDrop?: (store: IDnDStore, state?: T) => void;
    onHover?: (store: IDnDStore, state?: T) => void;
    onLeave?: (store: IDnDStore, state?: T) => void;
  };
  state?: T;
}

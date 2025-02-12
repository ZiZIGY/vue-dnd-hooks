import type { Component } from 'vue';

/**
 * Main store interface for drag and drop functionality
 * Extends hotkey tracking functionality
 */
export interface IDnDStore extends IHotkeys {
  isDragging: boolean;
  draggingElements?: Map<string, IElement> | IElement;
  elements: Map<string, IElement>;
  selectedElements: Map<string, IElement>;
  zones: Map<string, IDropZone>;
  coordinates?: ICoordinates;
  offset: IOffset;
  hovered: IHovered;
}

/**
 * Represents a draggable element
 */
export interface IElement<T = any> {
  node: HTMLElement | Element | null;
  id: string;
  defaultOuterHTML: string;
  group: string[];
  layer?: Component | null;
  defaultLayer?: Component | null;
  state?: IElementState<T>;
  onEnd?: (store: IDnDStore, state?: T) => void;
}

/**
 * Tracks currently hovered elements and drop zones
 */
export interface IHovered {
  elementId: string | null;
  zoneId: string | null;
}

/**
 * Represents a drop zone where elements can be dropped
 */
export interface IDropZone<T = any> {
  node: HTMLElement | Element | null;
  group: string[];
  state?: T;
  onDrop?: (store: IDnDStore, state?: T) => void;
  onHover?: (store: IDnDStore, state?: T) => void;
  onLeave?: (store: IDnDStore, state?: T) => void;
}

/**
 * Represents offset coordinates with percentage values
 */
export interface IOffset extends ICoordinates {
  percentX: number;
  percentY: number;
}

/**
 * Basic x/y coordinates interface
 */
export interface ICoordinates {
  x: number;
  y: number;
}

/**
 * Tracks the state of modifier keys
 */
export interface IHotkeys {
  isCtrlPressed: boolean;
  isShiftPressed: boolean;
  isAltPressed: boolean;
}

/**
 * Options for creating a draggable element
 */
export interface IUseElementOptions<T> {
  id?: string;
  layer?: IElement['layer'];
  group?: IElement['group'];
  state?: IElementState<T>;
  events?: {
    onEnd?: (store: IDnDStore, state?: T) => void;
  };
}

export interface IElementState<T> {
  array?: any[];
  index?: number;
  transferData?: T;
  parentId?: string;
}

/**
 * Options for creating a drop zone
 */
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

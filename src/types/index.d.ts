import { type Component, type Ref } from 'vue';

export type DnDEntityID = string | number | Crypto;

export interface IDnDElementRecord {
  id?: DnDEntityID;
  node?: HTMLElement | null;
  state?: any;
  group?: string | string[];
}

export type DnDProvider<T = void> = T & {
  isDragging: boolean;
  draggingElement: IDnDElementRecord | null;
  hoveredElement: IDnDElementRecord | null;
  hooks?: {
    onStart?: (context: DnDProvider<T>, event?: PointerEvent) => void;
    onEnd?: (context: DnDProvider<T>, event?: PointerEvent) => void;
  };
};

export interface ICoordinates {
  x: number;
  y: number;
}

export type ElementRect = ICoordinates & {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

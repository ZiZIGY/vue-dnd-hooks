import { type Component, type Ref } from 'vue';

export type DnDEntityID = string | number | Crypto;

export interface IDraggableProps {
  tag?: keyof HTMLElementTagNameMap;
  layer?: Component;
  id: DnDEntityID;
}

export type DraggableProps = {
  id?: DnDEntityID;
  tag?: keyof HTMLElementTagNameMap;
};

export interface UseDraggableOptions<T = void> {
  handle?: string;
  dragStart?: (context: T & IDnDProvider) => void;
  dragMove?: (context: T & IDnDProvider) => void;
  dragEnd?: (context: T & IDnDProvider) => void;
  onOver?: (context: T & IDnDProvider) => void;
  onLeave?: (context: T & IDnDProvider) => void;
}

export interface UseDroppableOptions<T = void> {
  onDrop?: (context: T & IDnDProvider) => void;
  onOver?: (context: T & IDnDProvider) => void;
  onLeave?: (context: T & IDnDProvider) => void;
}

export interface IDnDElementRecord {
  id: DnDEntityID;
  node: HTMLElement;
}

export interface IDnDProvider extends Record<string, any> {
  isDragging: boolean;
  overElement: IDnDElementRecord | null;
  dragEnd?: (context: IDnDProvider) => void;
}

export interface IDnDProviderOptions {
  dragEnd?: (context: IDnDProvider) => void;
}

export type ElementRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

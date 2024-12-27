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
  hideOnDrag?: boolean;
};

export interface UseDraggableOptions {
  onStart?: () => void;
  onMove?: () => void;
  onEnd?: () => void;
}

export interface UseDroppableOptions {
  onDrop?: () => void;
}

export interface IDnDOverElement {
  id: DnDEntityID;
  node: HTMLElement;
}

export interface IDnDProvider extends Record<string, any> {
  isDragging: boolean;
  overElement: IDnDOverElement | null;
}

export interface IDnDProviderOptions {
  onDragEnd?: (context: IDnDProvider) => void;
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

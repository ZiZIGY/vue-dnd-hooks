import { type Component, type Ref } from 'vue';

export type DraggableId = string | number | Crypto;

export interface IDraggableProps {
  tag?: keyof HTMLElementTagNameMap;
  layer?: Component;
  id: DraggableId;
}

export type DraggableProps = {
  id?: DraggableId;
  tag?: keyof HTMLElementTagNameMap;
  hideOnDrag?: boolean;
};

export interface UseDraggableOptions {
  id: DraggableId;
  onStart?: () => void;
  onMove?: () => void;
  onEnd?: () => void;
}

export interface IDnDContext {
  isDragging: boolean;
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

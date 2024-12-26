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
  contextName?: string;
  onStart?: () => void;
  onMove?: () => void;
  onEnd?: () => void;
}

export interface IDnDProvider extends Record<string, any> {
  isDragging: boolean;
  overElement: HTMLElement | null | Element;
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

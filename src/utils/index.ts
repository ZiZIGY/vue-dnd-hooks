import { DraggableId } from '@/@types';

export const contextName = 'DnDContext';

export const setID = (el: HTMLElement, id: DraggableId) => {
  el.dataset.dndId = id.toString();
};

export const userSelect = {
  originalValue: '',
  disable() {
    if (!this.originalValue) {
      this.originalValue = document.body.style.userSelect || '';
    }
    document.body.style.userSelect = 'none';
  },
  enable() {
    document.body.style.userSelect = this.originalValue;
    this.originalValue = '';
  },
};

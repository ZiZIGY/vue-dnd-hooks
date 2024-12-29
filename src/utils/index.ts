export const contextName = 'DnDContext';

export const setDataAttribute = (
  el: HTMLElement,
  key: string,
  value: string
) => {
  el.dataset[key] = value;
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

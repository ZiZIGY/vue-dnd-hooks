export const cssActions = {
  default: {
    userSelect: '',
    touchAction: '',
  },
  draggingStart() {
    this.default.userSelect = document.body.style.userSelect;
    this.default.touchAction = document.body.style.touchAction;

    document.body.style.userSelect = 'none';
    document.body.style.touchAction = 'none';
  },
  draggingEnd() {
    document.body.style.userSelect = this.default.userSelect;
    document.body.style.touchAction = this.default.touchAction;
  },
};

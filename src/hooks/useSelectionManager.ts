import { computed } from 'vue';
import { useDnDStore } from './useDnDStore';

/**
 * Manages element selection functionality
 */
export const useSelectionManager = (id: string) => {
  const store = useDnDStore();

  const isDescendant = (parentId: string, childId: string | null): boolean => {
    let currentId = childId;
    while (currentId) {
      if (currentId === parentId) return true;
      currentId = store.elements.get(currentId)?.state?.parentId || null;
    }
    return false;
  };

  const deselectElement = (elementId: string) =>
    store.selectedElements.delete(elementId);

  const clearSelectedElements = () => (store.selectedElements = new Map());

  const deselectParent = (elementId: string) => {
    let parentId = store.elements.get(elementId)?.state?.parentId;
    while (parentId) {
      if (store.selectedElements.has(parentId)) {
        store.selectedElements.delete(parentId);
        return;
      }
      parentId = store.elements.get(parentId)?.state?.parentId || undefined;
    }
  };

  const deselectChildren = (elementId: string) => {
    store.selectedElements.forEach((_, selectedId) => {
      if (isDescendant(elementId, selectedId)) {
        store.selectedElements.delete(selectedId);
      }
    });
  };

  const selectElement = () => {
    const element = store.elements.get(id);
    if (!element) return;

    deselectParent(id);
    deselectChildren(id);
    store.selectedElements.set(id, element);
  };

  const toggleElement = () => {
    const element = store.elements.get(id);
    if (!element) return;

    if (store.selectedElements.has(id)) {
      deselectElement(id);
      return;
    }

    selectElement();
  };

  const isElementSelected = computed<boolean>(() =>
    store.selectedElements.has(id)
  );

  return {
    selectElement,
    toggleElement,
    isElementSelected,
    clearSelectedElements,
  };
};

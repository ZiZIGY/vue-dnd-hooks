import { computed, type Ref } from 'vue';
import { useDnDStore } from '../composables/useDnDStore';

export const useSelectionManager = (elementRef: Ref<HTMLElement | null>) => {
  const { selectedElements, elements } = useDnDStore();

  const element = computed(() =>
    elements.value.find((element) => element.node === elementRef.value)
  );

  const isSelected = computed<boolean>(() =>
    selectedElements.value.some((element) => element.node === elementRef.value)
  );

  const handleUnselect = () => {
    if (!element.value) return;

    selectedElements.value = selectedElements.value.filter(
      (element) => element.node !== elementRef.value
    );
  };

  const handleSelect = () => {
    if (!element.value) return;

    selectedElements.value.push(element.value);
  };

  const handleToggleSelect = () => {
    if (!element.value) return;

    selectedElements.value.some((element) => element.node === elementRef.value)
      ? handleUnselect()
      : handleSelect();
  };

  return {
    handleUnselect,
    handleSelect,
    handleToggleSelect,
    isSelected,
  };
};

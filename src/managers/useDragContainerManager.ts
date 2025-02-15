import { computed, type Component } from 'vue';
import { useDnDStore } from '../composables/useDnDStore';

export const useDragContainerManager = () => {
  const store = useDnDStore();

  const registerContainer = (name: string, component: Component) =>
    store.dragContainers.set(name, component);

  const unregisterContainer = (name: string) =>
    store.dragContainers.delete(name);

  const activeContainer = computed(() =>
    store.activeContainerName.value
      ? store.dragContainers.get(store.activeContainerName.value)
      : null
  );

  return {
    registerContainer,
    unregisterContainer,
    activeContainer,
  };
};

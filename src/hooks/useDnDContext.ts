import { inject } from 'vue';

export const useDnDContext = <T>(name: string): T => {
  const context = inject<T>(name);

  if (!context) throw new Error(`context ${name} not found`);

  return context;
};

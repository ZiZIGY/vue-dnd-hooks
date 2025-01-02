import { DnDProvider } from '@/types';
import { inject } from 'vue';

export const useDnDContext = <T>(name: string) => {
  const context = inject<DnDProvider<T>>(name);

  if (!context) throw new Error(`context ${name} not found`);

  return context;
};

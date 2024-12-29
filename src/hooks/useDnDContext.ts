import { IDnDProvider } from '@/@types';
import { inject } from 'vue';

export const useDnDContext = <T>(name: string): T => {
  const context = inject<T & IDnDProvider>(name);

  if (!context) throw new Error(`context ${name} not found`);

  return context;
};

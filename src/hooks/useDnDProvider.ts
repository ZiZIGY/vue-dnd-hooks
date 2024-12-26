import { provide, reactive } from 'vue';

import { IDnDProvider } from '@/@types';

export const useDnDProvider = (name: string): IDnDProvider => {
  const provider = reactive<IDnDProvider>({
    isDragging: false,
  });

  provide(name, provider);

  return provider;
};

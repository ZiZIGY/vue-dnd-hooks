import { IDnDProvider, IDnDProviderOptions } from '@/@types';
import { provide, reactive } from 'vue';

export const useDnDProvider = (
  name: string,
  options: IDnDProviderOptions
): IDnDProvider => {
  const provider = reactive<IDnDProvider>({
    isDragging: false,
    overElement: null,
    dragEnd: options.onDragEnd,
  });

  provide(name, provider);

  return provider;
};

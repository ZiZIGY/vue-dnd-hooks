import { IDnDProvider, IDnDProviderOptions } from '@/@types';
import { provide, reactive } from 'vue';

export const useDnDProvider = <T = void>(
  name: string,
  options: IDnDProviderOptions
) => {
  const provider = reactive({
    isDragging: false,
    draggingElement: null,
    overElement: null,
    ...options,
  } satisfies IDnDProvider) as T & IDnDProvider;

  provide(name, provider);

  return provider;
};

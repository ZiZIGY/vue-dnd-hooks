import { provide, reactive } from 'vue';

import { DnDProvider } from '@/types';

export const useDnDProvider = <T = void>(
  name: string,
  options?: {
    hooks?: {
      onStart?: (context: DnDProvider<T>) => void;
      onEnd?: (context: DnDProvider<T>) => void;
    };
    state?: Partial<T>;
  }
) => {
  const provider = reactive({
    isDragging: false,
    draggingElement: null,
    hoveredElement: null,
    ...options?.state,
    hooks: options?.hooks,
  } as DnDProvider<T>);

  provide(name, provider);

  return provider;
};

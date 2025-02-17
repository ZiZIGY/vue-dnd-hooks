import { onBeforeUnmount, onMounted } from 'vue';

import type { IUseDropOptions } from '../types';
import { useZoneManager } from '../managers/useZoneManager';

export const useDrop = (options?: IUseDropOptions) => {
  const { elementRef, registerZone, unregisterZone, isOvered } =
    useZoneManager(options);

  onMounted(registerZone);
  onBeforeUnmount(unregisterZone);

  return { elementRef, isOvered };
};

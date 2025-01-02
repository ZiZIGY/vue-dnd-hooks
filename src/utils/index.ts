export const userSelect = {
  originalValue: '',
  disable() {
    if (!this.originalValue) {
      this.originalValue = document.body.style.userSelect || '';
    }
    document.body.style.userSelect = 'none';
  },
  enable() {
    document.body.style.userSelect = this.originalValue;
    this.originalValue = '';
  },
};

/**
 * Checks if two groups are compatible for drag and drop interaction
 * @param sourceGroup - Group or array of groups of the source element
 * @param targetGroup - Group or array of groups of the target element
 * @returns boolean - True if groups are compatible
 */
export const isGroupsCompatible = (
  sourceGroup?: string | string[],
  targetGroup?: string | string[]
): boolean => {
  // Если у одного элемента есть группа, а у другого нет - запрещаем
  if ((!sourceGroup && targetGroup) || (sourceGroup && !targetGroup))
    return false;

  // Если у обоих нет группы - разрешаем
  if (!sourceGroup && !targetGroup) return true;

  // Преобразуем в массивы для унификации проверки
  const sourceGroups = Array.isArray(sourceGroup) ? sourceGroup : [sourceGroup];
  const targetGroups = Array.isArray(targetGroup) ? targetGroup : [targetGroup];

  // Проверяем наличие хотя бы одной общей группы
  return sourceGroups.some((group) => targetGroups.includes(group));
};

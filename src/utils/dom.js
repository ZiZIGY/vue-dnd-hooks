export const isDescendant = (element, container) => {
    if (!element)
        return false;
    return container.contains(element);
};

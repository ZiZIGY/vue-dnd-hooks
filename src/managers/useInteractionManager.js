export const useInteractionManager = () => {
    let originalUserSelect = '';
    let originalTouchAction = '';
    let originalOverscrollBehavior = '';
    const disableInteractions = () => {
        const body = document.body;
        originalUserSelect = body.style.userSelect;
        originalTouchAction = body.style.touchAction;
        originalOverscrollBehavior = body.style.overscrollBehavior;
        body.style.userSelect = 'none';
        body.style.touchAction = 'none';
        body.style.overscrollBehavior = 'none';
        window.addEventListener('contextmenu', preventDefault);
        window.addEventListener('selectstart', preventDefault);
        window.addEventListener('touchstart', preventDefault);
        window.addEventListener('touchmove', preventDefault);
    };
    const enableInteractions = () => {
        const body = document.body;
        body.style.userSelect = originalUserSelect;
        body.style.touchAction = originalTouchAction;
        body.style.overscrollBehavior = originalOverscrollBehavior;
        window.removeEventListener('contextmenu', preventDefault);
        window.removeEventListener('selectstart', preventDefault);
        window.removeEventListener('touchstart', preventDefault);
        window.removeEventListener('touchmove', preventDefault);
    };
    const preventDefault = (event) => event.preventDefault();
    return {
        disableInteractions,
        enableInteractions,
    };
};

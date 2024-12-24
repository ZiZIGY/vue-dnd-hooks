import { onMounted, onUnmounted, reactive, ref } from 'vue';

interface DroppableOptions {
  id: string; // Уникальный идентификатор
  onDrop?: (event: DragEvent) => void; // Коллбэк при успешном дропе
}

export const useDroppable = (options: DroppableOptions) => {
  const containerRef = ref<HTMLElement | null>(null);
  const isOver = ref(false); // Показывает, находится ли элемент над контейнером
  const rect = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const updateRect = () => {
    if (!containerRef.value) return;
    const clientRect = containerRef.value.getBoundingClientRect();
    rect.x = clientRect.x + window.scrollX;
    rect.y = clientRect.y + window.scrollY;
    rect.width = clientRect.width;
    rect.height = clientRect.height;
    rect.top = clientRect.top + window.scrollY;
    rect.right = clientRect.right + window.scrollX;
    rect.bottom = clientRect.bottom + window.scrollY;
    rect.left = clientRect.left + window.scrollX;
  };

  const checkOverlap = (dragX: number, dragY: number) => {
    isOver.value =
      dragX >= rect.left &&
      dragX <= rect.right &&
      dragY >= rect.top &&
      dragY <= rect.bottom;
  };

  const handleDrop = (event: DragEvent) => {
    if (isOver.value && options.onDrop) {
      options.onDrop(event);
    }
    isOver.value = false;
  };

  onMounted(() => {
    if (!containerRef.value) return;

    updateRect();

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateRect);
    window.removeEventListener('scroll', updateRect);
  });

  return {
    containerRef,
    isOver, // Показывает, находится ли элемент над контейнером
    rect, // Текущие размеры и координаты контейнера
    checkOverlap, // Метод для проверки попадания в контейнер
    handleDrop, // Метод для обработки события drop
  };
};

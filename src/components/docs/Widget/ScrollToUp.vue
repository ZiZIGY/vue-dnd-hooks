<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import gsap from 'gsap';

  const buttonRef = ref<HTMLElement | null>(null);
  const isVisible = ref<boolean>(false);

  const checkScroll = () => {
    isVisible.value = window.scrollY > 400;
  };

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: 'power2.inOut',
    });

    if (buttonRef.value) {
      gsap.to(buttonRef.value, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', checkScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll);
  });

  // Хуки для Transition
  const onEnter = (el: Element, done: () => void) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 50,
        rotation: -180,
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        onComplete: done,
      }
    );
  };

  const onLeave = (el: Element, done: () => void) => {
    gsap.to(el, {
      opacity: 0,
      y: 50,
      rotation: -180,
      scale: 0.5,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: done,
    });
  };
</script>

<template>
  <Transition
    @enter="onEnter"
    @leave="onLeave"
    :css="false"
  >
    <button
      v-show="isVisible"
      ref="buttonRef"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-colors duration-200 backdrop-blur-sm bg-opacity-80"
      aria-label="Scroll to top"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </Transition>
</template>

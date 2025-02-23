<script setup lang="ts">
  import Header from './components/docs/App/Header.vue';
  import Footer from './components/docs/App/Footer.vue';
  import ScrollToTop from './components/docs/Widget/ScrollToUp.vue';
  import PageTransition from './components/docs/Widget/PageTransition.vue';
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b bg-gray-800">
    <Header />

    <main :class="['pt-[]']">
      <router-view />
    </main>

    <PageTransition />
    <ScrollToTop />
    <Footer />
  </div>
</template>

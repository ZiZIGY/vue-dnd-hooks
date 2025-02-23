<script setup lang="ts">
  import Header from './components/docs/App/Header.vue';
  import Footer from './components/docs/App/Footer.vue';
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
    <Header />
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

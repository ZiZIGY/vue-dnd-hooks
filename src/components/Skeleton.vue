<script setup lang="ts"></script>

<template>
  <div class="skeleton">
    <div class="skeleton__line"></div>
    <div class="skeleton__line"></div>
    <div class="skeleton__line"></div>
  </div>
</template>

<style scoped>
  .skeleton {
    width: 100%;
    height: 100px;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .skeleton__line {
    width: 100%;
    height: 10px;
    background-color: #f0f0f0;
    animation: animate 1.5s infinite;
  }

  @keyframes animate {
    0% {
      background-color: #f0f0f0;
    }
    50% {
      background-color: red;
    }
    100% {
      background-color: #f0f0f0;
    }
  }
</style>

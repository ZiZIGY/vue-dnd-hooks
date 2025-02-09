<template>
  <div class="skeleton"></div>
</template>

<style scoped>
  .skeleton {
    width: 300px;
    height: 20px;
    background-color: #f0f0f0;
    animation: skeleton-animation 1s infinite alternate;
    border-radius: 99999999px;
  }

  @keyframes skeleton-animation {
    0% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #b4b4b4;
    }
  }
</style>

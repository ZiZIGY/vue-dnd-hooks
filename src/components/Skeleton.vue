<template>
  <div>
    <div class="skeleton user"></div>
    <div class="skeleton text"></div>
    <div class="skeleton text_small"></div>
    <div class="skeleton text"></div>
  </div>
</template>

<style>
  @keyframes shimmer {
    0% {
      background-position: 100%;
    }
    100% {
      background-position: -100%;
    }
  }

  .skeleton {
    background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1s infinite;
    margin-bottom: 5px;
  }
  .user {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .text {
    height: 20px;
    border-radius: 12px;
  }
  .text_small {
    width: 50%;
    height: 10px;
    border-radius: 12px;
  }
</style>

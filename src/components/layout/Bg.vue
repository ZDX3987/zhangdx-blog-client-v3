<script setup lang="ts">

</script>

<template>
  <div class="bg_content">
    <div class="bg_img"></div>
  </div>
</template>

<style scoped>
.bg_content {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0; top: 0;
  z-index: -1;
}
.bg_img {
  width: 100%;
  height: 100vh;
  background: var(--bgImg);
  background-repeat: repeat;
}
</style>
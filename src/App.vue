<script setup lang="ts">
import HeaderBar from "./components/layout/HeaderBar.vue";
import Bg from "./components/layout/Bg.vue";

</script>

<template>
  <el-container>
    <Bg/>
    <div class="fixed_header">
      <HeaderBar></HeaderBar>
    </div>
  </el-container>
</template>

<style scoped>
.fixed_header {
  width: 100%;
  position: fixed;
  z-index: 20;
  top: 0;
  transition: all 0.5s;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

*:focus,
*:active:focus,
*.active:focus,
*.focus,
*:active.focus,
*.active.focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>

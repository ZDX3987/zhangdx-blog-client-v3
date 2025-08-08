<script setup lang="ts">
import HeaderBar from "./components/layout/HeaderBar.vue";
import Bg from "./components/layout/Bg.vue";
import {onMounted, onUnmounted} from "vue";
import LoginDialog from "./components/dialog/LoginDialog.vue";
import Footer from "./components/layout/Footer.vue";
import {useRoute} from "vue-router";

onMounted(() => {
  window.addEventListener('scroll', scrollFixedHeader)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollFixedHeader)
})

function scrollFixedHeader() {
  const headerEl = document.getElementsByClassName('fixed_header')
}

const route = useRoute()

</script>

<template>
  <el-container class="app_container">
    <Bg/>
    <div class="fixed_header">
      <HeaderBar></HeaderBar>
    </div>
    <main class="app_main">
      <RouterView :key="route.fullPath"/>
    </main>
    <Footer/>
    <LoginDialog/>
  </el-container>
</template>

<style scoped>
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

.app_container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.fixed_header {
  width: 100%;
  position: fixed;
  z-index: 20;
  top: 0;
  transition: all 0.5s;
}
.app_main {
  flex: 1;
  min-height: 0;
  margin-top: 65px;
}
</style>

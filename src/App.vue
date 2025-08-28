<script setup lang="ts">
import HeaderBar from "./components/layout/HeaderBar.vue";
import Bg from "./components/layout/Bg.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import LoginDialog from "./components/dialog/LoginDialog.vue";
import Footer from "./components/layout/Footer.vue";
import {useRoute} from "vue-router";
import BreadcrumbRouter from "./components/comment/BreadcrumbRouter.vue";

onMounted(() => {
  window.addEventListener('scroll', scrollFixedHeader)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollFixedHeader)
})

const fixHeaderClassName = ref('')
let lastScrollHeight = 0

function scrollFixedHeader() {
  let scrollHeight = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  fixHeaderClassName.value = scrollHeight < lastScrollHeight ? 'fixed_header_down' : 'fixed_header_up'
  lastScrollHeight = scrollHeight
}

const route = useRoute()
const isHomeRoute = computed(() => {
  return route.name === 'Home'
})

</script>

<template>
  <el-container class="app_container">
    <Bg/>
    <div id="app_header" class="fixed_header" :class="fixHeaderClassName">
      <HeaderBar></HeaderBar>
    </div>
    <main class="app_main">
      <BreadcrumbRouter v-if="!isHomeRoute"/>
      <RouterView :key="route.fullPath"/>
    </main>
    <Footer/>
    <el-backtop/>
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
.fixed_header_up {
  transform: translate(0, -160px);
}
.fixed_header_down {
  transform: translate(0, 0);
}
.app_main {
  flex: 1;
  min-height: 0;
  margin-top: 60px;
}
</style>

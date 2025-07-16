<script setup lang="ts">
import {ref} from "vue";

const currentTheme = ref('light')

function switchTheme() {
  currentTheme.value = 'dark'
}

</script>

<template>
  <div>
    <el-button type="primary" @click="switchTheme">{{currentTheme}}</el-button>
  </div>

</template>

<style scoped>

</style>

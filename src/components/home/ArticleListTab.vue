<script setup lang="ts">

import {ref} from "vue";

const tabList = [
  {text: '最新文章', orderBy: '', type: 1},
  {text: '推荐文章', orderBy: '', type: 2}
]
const selectType = ref(1)
</script>

<template>
<div class="list_tab_content">
  <el-row>
    <el-col class="tab_item" :sm="3" :xs="4" v-for="tab of tabList" :key="tab.type">
      <el-link :underline="false" :class="selectType === tab.type ? 'active_tab' : ''">{{tab.text}}</el-link>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.list_tab_content {
  background-color: var(--bgColor);
  border-bottom: 1px solid var(--borderColor);
  height: 50px;
  line-height: 50px;
}
.active_tab {
  color: var(--mainThemeColor) !important;
}
.tab_item {
  margin: 0 30px;
}
</style>
<script setup lang="ts">
import {ref} from "vue";
import MenuBar from "./MenuBar.vue";

const headerBarTitle = ref('ZHANGDX')
const headerLayout = ref({
  leftBar: {
    sm: 2,
    xs: 2
  },
  title: {
    md: {offset: 2, span: 2},
    sm: {offset: 7, span: 6},
    xs: {offset: 7, span: 6}
  },
  menuBar: {
    md: {offset: 2, span: 12}
  },
  rightBar: {
    md: {offset:3, span: 3},
    sm: {offset:6, span: 3},
    xs: {offset:2, span: 7}
  }
})
</script>
<template>
<div class="header_bar_content">
  <el-row type="flex" align="middle" justify="center">
    <el-col class="hidden-md-and-up" :sm="headerLayout.leftBar.sm" :xs="headerLayout.leftBar.xs">

    </el-col>
    <el-col :md="headerLayout.title.md" :sm="headerLayout.title.sm" :xs="headerLayout.title.xs">
      <RouterLink class="header_bar_title_common" :to="{name: 'Home'}">
        <span class="header_bar_title_common header_bar_title">{{headerBarTitle}}</span>
      </RouterLink>
    </el-col>
    <el-col class="hidden-sm-and-down" :md="headerLayout.menuBar.md">
      <MenuBar></MenuBar>
    </el-col>
    <el-col :md="headerLayout.rightBar.md" :sm="headerLayout.rightBar.sm" :xs="headerLayout.rightBar.xs">

    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.header_bar_content {
  background-color: var(--bgColor);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  text-align: center;
}

.header_bar_title {
  height: 100%;
  font-weight: bold;
  background-image: linear-gradient(to right, #17b3a1, #e0142b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header_bar_title_common {
  margin-right: 0;
  padding: .3125rem 0;
  font-size: 1.25rem;
  line-height: inherit;
  display: inline-block;
}
</style>
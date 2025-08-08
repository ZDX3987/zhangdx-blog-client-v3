<script setup lang="ts">

import ArticleListTab from "../components/home/ArticleListTab.vue";
import ArticleList from "../components/article/ArticleList.vue";

const homeColSpan = {
  left: {
    xl: {span: 10, offset: 5},
    lg: {span: 13, offset: 3},
    md: {span: 14, offset: 2},
    sm: {span: 22, offset: 1},
    xs: {span: 22, offset: 1}
  },
  right: {
    xl: 4,
    lg: 5,
    md: 6,
    sm: {span: 22, offset: 1},
    xs: {span: 22, offset: 1}
  }
}
</script>

<template>
  <el-row>
    <el-col :xl="homeColSpan.left.xl" :lg="homeColSpan.left.lg" :md="homeColSpan.left.md" :sm="homeColSpan.left.sm" :xs="homeColSpan.left.xs">
      <div class="home_article_content">
        <ArticleListTab/>
        <ArticleList/>
      </div>
    </el-col>
    <el-col :xl="homeColSpan.right.xl" :lg="homeColSpan.right.lg" :md="homeColSpan.right.md" :sm="homeColSpan.right.sm" :xs="homeColSpan.right.xs">

    </el-col>
  </el-row>
</template>

<style scoped>
.home_article_content {
  margin-top: 20px;
}
</style>
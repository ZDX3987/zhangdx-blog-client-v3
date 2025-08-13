<script setup lang="ts">

import ArticleListTab from "../components/home/ArticleListTab.vue";
import ArticleList from "../components/article/ArticleList.vue";
import {ref} from "vue";
import CateCloud from "../components/home/CateCloud.vue";
import TopicCard from "../components/home/TopicSide.vue";

const homeColSpan = {
  left: {
    xl: {span: 10, offset: 5},
    lg: {span: 13, offset: 3},
    md: {span: 14, offset: 2},
    sm: {span: 22, offset: 1},
    xs: {span: 22, offset: 1}
  },
  right: {
    xl: {span: 4, offset: 0},
    lg: {span: 5, offset: 0},
    md: {span: 6, offset: 0},
    sm: {span: 22, offset: 1},
    xs: {span: 22, offset: 1}
  }
}
const articleQueryType = ref(1)
function changeArticleListTab(type: number) {
  articleQueryType.value = type
}
</script>

<template>
  <el-row>
    <el-col :xl="homeColSpan.left.xl" :lg="homeColSpan.left.lg" :md="homeColSpan.left.md" :sm="homeColSpan.left.sm" :xs="homeColSpan.left.xs">
      <div class="home_article_content">
        <ArticleListTab @select-tab="changeArticleListTab"/>
        <ArticleList :query-type="articleQueryType"/>
      </div>
    </el-col>
    <el-col :xl="homeColSpan.right.xl" :lg="homeColSpan.right.lg" :md="homeColSpan.right.md" :sm="homeColSpan.right.sm" :xs="homeColSpan.right.xs">
      <div class="home_right_content">
        <CateCloud/>
        <TopicCard/>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.home_article_content {
  margin-top: 20px;
  margin-bottom: 20px;
}
.home_right_content {
  margin-top: 20px;
  margin-left: 20px;
}
</style>
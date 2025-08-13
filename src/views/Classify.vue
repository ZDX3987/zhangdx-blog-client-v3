<script setup lang="ts">
import ArticleList from "../components/article/ArticleList.vue";
import {ref} from "vue";
import ClassifyList from "../components/classify/ClassifyList.vue";

const queryCateIds = ref<number[]>([])

function setQueryCateId(cateIds: number[]) {
  queryCateIds.value = cateIds
}
</script>

<template>
<div class="classify_content">
  <el-row type="flex" justify="center">
    <el-col :lg="12" :md="20" :xs="22" :sm="22">
      <ClassifyList @query-category="setQueryCateId" />
    </el-col>
  </el-row>
  <el-row class="divider_margin"></el-row>
  <el-row type="flex" justify="center">
    <el-col :lg="12" :md="20" :xs="22" :sm="22">
      <ArticleList :query-cate-ids="queryCateIds"/>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.classify_content {
  padding-bottom: 20px;
}
.divider_margin {
  margin-bottom: 10px;
}
</style>
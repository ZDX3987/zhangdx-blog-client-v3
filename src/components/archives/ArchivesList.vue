<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {ArticleItem} from "../../types/ArticleItem.ts";
import {dateFormat} from "../../utils/moment-date.ts";
import ArticleSimpleItem from "../article/ArticleSimpleItem.vue";
import {getArticleForArchives} from "../../api/articleApi.ts";
import {ResultPage} from "../../types/ResultPage.ts";

const articleList = ref<ArticleItem[]>([])
const props = defineProps({
  queryDateStr: {type: String, default: ''}
})

watch([() => props.queryDateStr], () => {
  getArticlePage()
})

onMounted(() => {
  getArticlePage()
})

function getArticlePage() {
  getArticleForArchives(props.queryDateStr, 1).then(res => {
    articleList.value = ResultPage.build(res.data, ArticleItem).records
  })
}
</script>

<template>
  <div class="archives_list">
    <el-timeline>
      <el-timeline-item v-for="article of articleList" :key="article.id" :timestamp="dateFormat(article.publishDate, 'yyyy-MM-DD')" placement="top">
        <el-card class="article_card">
          <ArticleSimpleItem :article-item="article"/>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped>
.article_card {
  background-color: var(--bgColor);
  border-color: var(--borderColor);
  color: var(--fontColor);
}

.article_card a {
  color: var(--fontColor);
  text-decoration: none;
  transition: all 0.5s;
}

.article_card a:hover {
  color: var(--mainThemeColor);
}
</style>
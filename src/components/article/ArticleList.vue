<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {ArticleItem} from "../../types/ArticleItem.ts";
import ArticleListItem from "./ArticleListItem.vue";
import ArticleListItemSkeleton from "../skeleton/ArticleListItemSkeleton.vue";
import {getArticleByPage} from "../../api/articleApi.ts";
import {ResultPage} from "../../types/ResultPage.ts";
import PageList from "../common/PageList.vue";

const articleList = ref<ArticleItem[]>([])
const isLoading = ref(false)
const listEnd = ref(false)
const isEmpty = ref(false)
const skeletonSize = 3
const props = defineProps({
  pageDisabled: {type: Boolean, default: true},
  queryCateIds: {type: Array<number>, default: []},
  queryType: {type: Number, default: 1},
})

const pageSize = 10
const currentPage = ref(1)
const total = ref(0)

onMounted(() => {
  queryArticle(1)
})

watch([() => props.queryCateIds, () => props.queryType], () => {
  queryArticle(currentPage.value)
})

function queryArticle(queryPage: number) {
  isLoading.value = true
  currentPage.value = queryPage
  if (queryPage === 1 || !props.pageDisabled) {
    articleList.value = []
  }
  getArticleByPage(pageSize, queryPage, 2, props.queryCateIds, props.queryType)
      .then(res => {
        let resultPage: ResultPage<ArticleItem> = ResultPage.build<ArticleItem>(res.data, ArticleItem)
        isEmpty.value = resultPage.isEmpty()
        if (isEmpty.value) {
          return
        }
        if (props.pageDisabled) {
          articleList.value = articleList.value.concat(resultPage.records)
          if (articleList.value.length === resultPage.total) {
            listEnd.value = true
          }
        } else {
          articleList.value = resultPage.records
        }
        total.value = resultPage.total
        isLoading.value = false
      })
}

function loadMoreArticle() {
  queryArticle(++currentPage.value)
}
</script>

<template>
<div class="article_list_content">
  <ul class="article_list_ul">
    <li v-for="(article, index) of articleList" :key="index">
      <ArticleListItem :article-item="article"/>
    </li>
    <ul class="article_list_ul" v-if="isLoading">
      <li v-for="index of skeletonSize" :key="index">
        <ArticleListItemSkeleton/>
      </li>
    </ul>
    <li v-if="pageDisabled">
      <div class="load_more">
        <a v-if="!listEnd" @click="loadMoreArticle">点击加载更多</a>
        <p v-if="listEnd">已经到底了...</p>
      </div>
    </li>
    <li v-else>
      <PageList :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="queryArticle"/>
    </li>
  </ul>
</div>
</template>

<style scoped>
.article_list_content {
  width: 100%;
  background-color: var(--bgColor);
  min-height: 76em;
}
.article_list_ul {
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
}
.article_list_ul li {
  padding: 20px 20px;
  border-bottom: 1px solid var(--borderColor);
}
.load_more {
  text-align: center;
}
.load_more a {
  text-decoration: none;
  cursor: pointer;
}

.load_more a, p {
  color: var(--aColor);
}
</style>
<script setup lang="ts">

import {onMounted, reactive} from "vue";
import type {ArticleItem} from "../../types/ArticleItem.ts";
import {getPrevAndNextArticle} from "../../api/articleApi.ts";

const articleList = reactive<ArticleItem[] | null[]>([null, null])
const props = defineProps({
  articleId: ''
})

onMounted(() => {
  queryPrevAndNextArticle()
})

function queryPrevAndNextArticle() {
  getPrevAndNextArticle(props.articleId).then(res => {
    let result = res.data
    articleList[0] = result[0]
    articleList[1] = result[1]
  })

}
</script>

<template>
  <el-row class="article_direction">
    <el-col class="article_direction_item" :span="12">
      <RouterLink v-if="articleList[0]"
                   :to="{ name: 'ArticleDetail', params: { id: articleList[0].articleId } }">
        上一篇：{{ articleList[0].title }}
      </RouterLink>
      <p v-else>
        上一篇：无
      </p>
    </el-col>
    <div class="dividing_line"></div>
    <el-col class="article_direction_item" :span="12">
      <RouterLink v-if="articleList[1]"
                   :to="{ name: 'ArticleDetail', params: { id: articleList[1].articleId } }">
        下一篇：{{ articleList[1].title }}
      </RouterLink>
      <p v-else>
        下一篇：无
      </p>
    </el-col>
  </el-row>
</template>

<style scoped>
.article_direction {
  background-color: var(--bgColor);
  height: 80px;
  border-top: 1px solid var(--borderColor);
}

.article_direction_item {
  height: 80px;
  line-height: 80px;
  color: var(--fontColor);
  text-align: center;
}

.article_direction_item:nth-of-type(1) {
  border-right: 1px solid var(--borderColor);
}
.article_direction_item p {
  margin: 0;
}
.article_direction_item a {
  width: 80%;
  text-decoration: none;
  color: var(--fontColor);
  transition: all 0.5s;
}

.article_direction_item a:hover {
  color: var(--mainThemeColor);
}
</style>
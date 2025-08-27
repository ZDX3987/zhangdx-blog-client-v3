<script setup lang="ts">

import {onMounted, ref} from "vue";
import type {ArticleItem} from "../../types/ArticleItem.ts";
import {dateFormat} from "../../utils/moment-date.ts";
import {getRelatedArticles} from "../../api/articleApi.ts";
import EmptyList from "../common/EmptyList.vue";

const relatedArticles = ref<ArticleItem[]>([])
const props = defineProps({
  articleId: {type: String, required: true}
})

onMounted(() => {
  getRelatedArticleList()
})
function getRelatedArticleList() {
  getRelatedArticles(props.articleId).then(res => {
    relatedArticles.value = res.data
  })
}
</script>

<template>
  <div class="related_articles">
    <div class="related_articles_header">
      <span><i class="fa fa-folder-open"></i>&nbsp;相关文章</span>
    </div>
    <div class="related_articles_body">
      <div v-if="relatedArticles.length === 0">
        <EmptyList/>
      </div>
      <el-row v-else>
        <el-col :md="12" :sm="24" v-for="article of relatedArticles" :key="article.id">
          <div class="related_articles_item">
            <router-link :to="{ name: 'ArticleDetail', params: { id: article.articleId } }">
              {{ article.title }}
            </router-link>
            <div class="related_articles_item_sub">
              <span>{{article.author.nickname}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{dateFormat(article.publishDate,"yyyy-MM-DD")}}</span>
              <el-divider direction="vertical"></el-divider>
              <span class="related_articles_item_sub_span">
              <i class="iconfont iconchakan" aria-hidden="true"/>&nbsp;{{ article.readCount }}
              </span>
              <span class="related_articles_item_sub_span">
                <i class="iconfont iconzan" aria-hidden="true"/>&nbsp;{{ article.praise }}
              </span>
              <span>
                <i class="iconfont iconpinglun" aria-hidden="true"/>&nbsp;{{ article.commentCount }}
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.related_articles {
  background-color: var(--bgColor);
  margin-top: 20px;
}

.related_articles_header {
  height: 50px;
  border-bottom: 1px solid var(--borderColor);
  font-size: 18px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}

.related_articles_header a {
  text-decoration: none;
}

.related_articles_item {
  text-align: left;
  border-bottom: 1px solid var(--borderColor);
  padding: 10px 0;
}

.related_articles_item a {
  width: 90%;
  text-decoration: none;
  color: var(--fontColor);
  transition: all 0.5s;
  margin-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.related_articles_item a:hover {
  color: var(--mainThemeColor);
}
.related_articles_item_sub {
  font-size: 14px;
  color: var(--subFontColor);
  margin-left: 30px;
}
.related_articles_item_sub_span {
  margin-right: 10px;
}
</style>
<script setup lang="ts">
import {TopicItem} from "../../types/TopicItem.ts";
import {dateFormat} from "../../utils/moment-date.ts";
import {computed} from "vue";

const prop = defineProps({
  topicItem: {type: TopicItem, default: {}}
})
const carouselItemArticleLength = 4
const carouselLength = computed(() => {
  let articleItems = prop.topicItem.articleList;
  return articleItems ? Math.ceil(articleItems.length / carouselItemArticleLength) : 0
})
</script>

<template>
<div class="topic_card p-3">
  <div class="topic_title">
    <RouterLink class="d-block mb-3 text-truncate" :to="{name: 'TopicDetail', params: {id: topicItem.id}}">
      {{topicItem.title}}
    </RouterLink>
    <span class="float-left">更新于：{{dateFormat(topicItem.updateDate, 'yyyy-MM-DD')}}</span>
  </div>
  <el-carousel :interval="5000" :arrow="topicItem.articleList.length > carouselItemArticleLength ? 'hover' : 'never'" height="200px"
               indicator-position="none">
    <el-carousel-item v-for="item in carouselLength" :key="item">
      <ul class="topic_article mt-3 pt-3">
        <li class="mb-1" v-for="article in topicItem.articleList.slice(item * carouselItemArticleLength - carouselItemArticleLength, item * carouselItemArticleLength)" :key="article.id">
          <RouterLink class="d-inline-block text-truncate float-start" :to="{name: 'ArticleDetail', params: {articleId: article.articleId}}">
            {{article.title}}
          </RouterLink>
          <div class="article_cate d-inline-block float-end text-truncate">
            <span>{{dateFormat(article.publishDate, 'yyyy-MM-DD')}}</span>
          </div>
        </li>
      </ul>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<style scoped>
.topic_card {
  background-color: var(--bgColor);
  transition: all 0.5s;
}

.topic_card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  transform: translateY(-5px);
}

.topic_title a {
  font-size: 20px;
  text-decoration: none;
  color: var(--articleTitle);
  transition: all 0.5s;
  max-width: 100%;
  font-weight: 600;
}

.topic_card a:hover {
  color: var(--mainThemeColor);
}

.topic_title span {
  color: var(--subFontColor);
  font-size: 14px;
}

.topic_article {
  border-top: 1px solid var(--borderColor);
  height: 120px;
}
.topic_article {
  padding: 10px;
}
.topic_article li {
  height: 40px;
  list-style: none;
}
.topic_article li a {
  text-decoration: none;
  color: var(--aColor);
  transition: all 0.5s;
  font-size: 15px;
  font-weight: 600;
  max-width: 65%;
}

.topic_article .article_cate {
  max-width: 30%;
  font-size: 14px;
  color: var(--aColor);
}
</style>
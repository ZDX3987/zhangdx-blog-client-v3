<script setup lang="ts">

import {ref} from "vue";
import {ArticleItem} from "../../types/ArticleItem.ts";
import {dateFormat} from "../../utils/moment-date.ts";

const props = defineProps({
  articleItem: {type: ArticleItem, default: null}
})
</script>

<template>
  <div class="article_simple_item">
    <RouterLink :to="{name: 'ArticleDetail', params: { articleId: articleItem.articleId }}">
      <h4 class="article_title">{{ articleItem.title }}</h4>
    </RouterLink>
    <p class="article_digest">{{articleItem.digest}}</p>
    <el-row>
      <el-col :sm="18":xs="24">
        <p>
          <span>{{articleItem.author.nickname}}</span>
          <el-divider direction="vertical"></el-divider>
          <span v-for="(tag, index) of articleItem.categories" :key="tag.id">
                  {{ index != 0 ? '&nbsp/&nbsp' : '' }}
                  {{ tag.cateName }}
                </span>
          <el-divider direction="vertical"></el-divider>
          <span>{{ dateFormat(articleItem.publishDate, "yyyy-MM-DD") }}</span>
          <el-divider direction="vertical"></el-divider>
          <span class="article_info_btn">
              <i class="iconfont iconchakan" aria-hidden="true"/>&nbsp;{{ articleItem.readCount }}
              </span>
          <span class="article_info_btn">
                <i class="iconfont iconzan" aria-hidden="true"/>&nbsp;{{ articleItem.praise }}
              </span>
          <span>
                <i class="iconfont iconpinglun" aria-hidden="true"/>&nbsp;{{ articleItem.commentCount }}
              </span>
        </p>
      </el-col>
      <el-col :sm="6" :xs="24">
        <slot name="rightBtn"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.article_simple_item a {
  color: var(--fontColor);
  text-decoration: none;
  transition: all 0.5s;
}
.article_title {
  margin: 0;
  font-size: 24px;
  font-weight: inherit;
}
.article_simple_item a:hover {
  color: var(--mainThemeColor);
}
.article_digest {
  color: var(--subFontColor);
  font-size: 14px;
}
.article_info_btn {
  margin-right: 6px;
}
</style>
<script setup lang="ts">
import {ArticleItem} from "../../types/ArticleItem.ts";
import {dateFormat} from "../../utils/moment-date.ts";

const props = defineProps({
  articleItem: {type: ArticleItem, default: null}
})

</script>

<template>
  <el-row>
    <el-col class="article_item_left" v-if="articleItem.hasCoverImg()" :sm="8">
      <RouterLink :to="{name: 'ArticleDetail', params: { articleId: articleItem.articleId }}">
        <el-image class="cover_img" :key="articleItem.coverImg" :src="articleItem.coverImg" lazy>
          <template #error>
            <img src="/public/images/notfound.gif" alt="ERROR"/>
          </template>
        </el-image>
      </RouterLink>
    </el-col>
    <el-col class="article_item_right" :class="articleItem.hasCoverImg() ? 'ps-md-3' : ''" :sm="articleItem.hasCoverImg() ? 16 : 24">
      <h2 class="item_title_h2">
        <RouterLink class="item_title" :to="{name: 'ArticleDetail', params: { articleId: articleItem.articleId }}"
                    v-html="articleItem.title"/>
      </h2>
      <p v-if="articleItem.digest" class="item_digest" v-html="articleItem.digest"></p>
      <div class="item_tags">
        <p class="item_type" v-if="articleItem.articleType">【{{ articleItem.articleType }}】</p>
        <span v-for="(tag, index) of articleItem.categories" :key="tag.id">
          <el-divider v-if="index !== 0" direction="vertical"></el-divider>
          <RouterLink :to="{name: 'CateList', params: {id: tag.id}}">{{ tag.cateName }}</RouterLink>
        </span>
      </div>
      <el-row class="item_info">
        <el-col :sm="14" :xs="12">
            <span :title="articleItem.author.nickname">
              <el-avatar class="item_author_avatar" :size="20" :src="articleItem.author.avatar">
                <i class="el-icon-user-solid" aria-hidden="true"/>
              </el-avatar>
              <span class="item_author_name">&nbsp;{{ articleItem.author.nickname }}</span>
            </span>
          <span class="item_date">
              <span class="iconfont iconriqi" aria-hidden="true"></span>
              <span>&nbsp;{{ dateFormat(articleItem.publishDate, "yyyy-MM-DD") }}</span>
            </span>
        </el-col>
        <el-col class="item_info_right" :sm="10" :xs="12">
            <span>
              <i class="iconfont iconchakan" aria-hidden="true"/>&nbsp;{{ articleItem.readCount }}
            </span>
          <span>
              <i class="iconfont iconzan" aria-hidden="true"/>&nbsp;{{ articleItem.praise }}
            </span>
          <span>
              <i class="iconfont iconpinglun" aria-hidden="true"/>&nbsp;{{ articleItem.commentCount }}
            </span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>
.cover_img {
  width: 100%;
  height: 150px;
  transition: all 0.5s;
  opacity: 1;
  overflow: hidden;
  margin-bottom: 8px;
}

.cover_img img {
  width: 100%;
  height: 150px;
  transition: all 0.5s;
  object-fit: cover;
}

.cover_img >>> img:hover {
  opacity: 0.8;
  transform: scale(1.2);
}
.item_title_h2 {
  margin: 0;
}
.item_title {
  display: block;
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  color: var(--articleTitle);
  transition: all 0.5s;
  overflow: hidden;
}

.item_title:hover {
  color: var(--mainThemeColor);
}

.item_digest {
  text-align: justify;
  font-size: 14px;
  margin: 10px 0;
  width: 100%;
  color: var(--subFontColor);
  text-wrap: wrap;
}

.item_tags {
  margin-top: 10px;
  text-align: left;
}

.item_tags span, a {
  color: #B2BAC2;
  font-size: 14px;
  text-decoration: none;
}

.item_type {
  display: inline;
  color: var(--mainThemeColor);
  line-height: 100%;
}

.item_tags a:hover {
  color: var(--mainThemeColor);
}

.item_info {
  font-size: 13px;
  text-align: left;
  margin-top: 10px;
  color: var(--subFontColor);
}

.item_author_name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px;
}

.item_info span {
  display: inline-block;
  overflow: hidden;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.item_info_right {
  text-align: right;
}

/*搜索结果关键字高亮*/
::v-deep .search-keyword-highlight {
  color: var(--mainThemeColor) !important;
}
</style>
<script setup lang="ts">

import {onMounted, ref, useTemplateRef} from "vue";
import {ArticleItem} from "../types/ArticleItem.ts";
import {getArticleById} from "../api/articleApi.ts";
import {useRoute} from "vue-router";
import {dateFormat} from "../utils/moment-date.ts";
import {toClass} from "../utils/to-class.ts";
import VditorPreview from 'vditor/dist/method.min'
import "vditor/dist/index.css";
import ArticleCatalog from "../components/article/ArticleCatalog.vue";

const article = ref<ArticleItem>(ArticleItem.emptyArticleItem())
const isRender = ref(false)
const directoryShow = ref(false)
const codeTheme = ref('native')
const articleRender = useTemplateRef('articleTextRender')
const route = useRoute()
onMounted(() => {
  VditorPreview.mermaidRender(document)
  let articleId: string = route.params.articleId
  getArticleById(articleId).then(res => {
    article.value = toClass(res.data, ArticleItem)
    renderArticle(article.value, () => isRender.value = true)
  })
})

function renderArticle(article: ArticleItem, renderFunc: Function) {
  if (article.source === 2) {
    VditorPreview.preview(articleRender.value, article.text, {
      after() {
        renderFunc()
        // 动态加载侧边栏目录
        directoryShow.value = true;
      },
      lazyLoadImage: 'Loading',
      hljs: {
        style: getArticleExtraCodeTheme(article) || (codeTheme.value === 'light' ? 'github' : 'native'),
        lineNumber: true
      }
    })
  }
}
function getArticleExtraCodeTheme(article: ArticleItem) {
  if (!article.extraData) {
    return null
  }
  let codeTheme = null
  let previewConfig = article.extraData.previewConfig
  if (previewConfig) {
    let vditorPreview = previewConfig.vditorPreview
    if (vditorPreview) {
      codeTheme = vditorPreview.hlStyle
    }
  }
  return codeTheme
}
</script>

<template>
<div class="article_detail_wrapper">
  <el-row type="flex" justify="center">
    <el-col :xl="1" :md="2" class="hidden-sm-and-down"></el-col>
    <el-col :lg="12" :md="15" :xs="22" :sm="22">
      <div class="article_detail_content">
        <h2 class="article_title">{{article.title}}</h2>
        <el-row class="article_info">
          <el-col :xs="9" :sm="5" :xl="3" class="article_date">
            <span class="iconfont iconriqi"></span>
            {{dateFormat(article.publishDate, 'yyyy-MM-DD')}}
          </el-col>
          <el-col :xs="9" :sm="5" :xl="3" class="article_author">
            <el-avatar :src="article.author.avatar" size="small">{{ article.author.nickname }}</el-avatar>
            {{ article?.author.nickname }}
          </el-col>
          <el-col v-if="article.categories.length !==0" :xs="20" :sm="10">
            <i class="iconfont iconbiaoqian"></i>
            <span class="article_cate_item" v-for="(tag, index) of article.categories"
                  :key="tag.id">{{ index != 0 ? '&nbsp/&nbsp' : '' }}
                <RouterLink :to="{name: 'CateList', params: {id: tag.id}}">{{ tag.cateName }}</RouterLink>
            </span>
          </el-col>
        </el-row>
        <el-divider/>
        <el-image v-if="article.hasCoverImg()" :src="article.coverImg" fit="scale-down"></el-image>
        <div class="article_render">
          <div id="article_text" ref="articleTextRender" class="article_text"></div>
        </div>
        <el-divider/>
      </div>
    </el-col>
    <el-col :md="5" class="hidden-sm-and-down catalog_col_wrapper">
      <ArticleCatalog v-if="isRender" container-ref="article_text"/>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.article_detail_wrapper {
  padding-top: 20px;
  padding-bottom: 20px;
}

.article_detail_content {
  background-color: var(--bgColor);
  padding: 40px;
  text-align: left;
}
.article_title {
  margin: 0;
  color: var(--articleTitle);
}
.article_info {
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  color: #999;
}
.article_date {
  font-size: 14px;
}
.article_author {
  font-size: 14px;
  line-height: 40px;
  height: 40px;
}
.catalog_col_wrapper {
  padding-left: 20px;
}
.article_cate_item a {
  text-decoration: none;
  color: #999;
}
.article_cate_item a:hover {
  color: var(--mainThemeColor);
}
</style>
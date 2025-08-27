<script setup lang="ts">

import {computed, onMounted, ref, useTemplateRef} from "vue";
import {ArticleItem} from "../types/ArticleItem.ts";
import {getArticleById} from "../api/articleApi.ts";
import {useRoute} from "vue-router";
import {dateFormat} from "../utils/moment-date.ts";
import {toClass} from "../utils/to-class.ts";
import VditorPreview from 'vditor/dist/method.min'
import "vditor/dist/index.css";
import ArticleCatalog from "../components/article/ArticleCatalog.vue";
import {getAuthorization} from "../utils/auth-storage.ts";
import {useMainStore} from "../stores/store.ts";
import {praise, unPraise} from "../api/common.ts";
import ArticleDirection from "../components/article/ArticleDirection.vue";
import CommentReply from "../components/comment/CommentReply.vue";
import RelatedArticles from "../components/article/RelatedArticles.vue";

const route = useRoute()
const articleId = ref<string>(route.params.articleId)
const article = ref<ArticleItem>(ArticleItem.emptyArticleItem())
const isRender = ref(false)
const directoryShow = ref(false)
const codeTheme = ref('native')
const articleRender = useTemplateRef('articleTextRender')
const store = useMainStore()
const currentAuthUserInfo = computed(() => {
  return store.userInfo
})

onMounted(() => {
  VditorPreview.mermaidRender(document)
  getArticleById(articleId.value).then(res => {
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

let praising = false
function praiseArticle() {
  praising = true
  if (!getAuthorization() || currentAuthUserInfo.value === null) {
    store.toggleLoginDialog(true)
    return;
  }
  if (article.value.liked) {
    unPraise(article.value.id, currentAuthUserInfo.value.id, 1).then(() => {
      article.value.praise--
      article.value.liked = false
      praising = false
    })
  } else {
    praise(article.value.id, currentAuthUserInfo.value.id, 1).then(() => {
      article.value.praise++
      article.value.liked = true
      praising = false
    })
  }

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
            {{ article.author.nickname }}
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
        <div class="article_footer">
          <button class="article_praise_btn" @click="praiseArticle" :disabled="praising"
                  :class="article.liked ? 'article_praised_btn' : ''">
            <i class="iconfont icontubiao5"></i>
            {{ article.praise }}
          </button>
        </div>
      </div>
      <ArticleDirection :article-id="articleId" />
    </el-col>
    <el-col :md="5" class="hidden-sm-and-down catalog_col_wrapper">
      <el-affix :offset="85" target=".article_text" z-index="1">
        <ArticleCatalog v-if="isRender" container-ref="article_text"/>
      </el-affix>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
    <el-col :xl="1" :md="2" class="hidden-sm-and-down"></el-col>
    <el-col :lg="12" :md="15" :xs="22" :sm="22">
      <CommentReply :item-id="articleId" :comment-type="1"/>
      <RelatedArticles :article-id="articleId"/>
    </el-col>
    <el-col :md="5" class="hidden-sm-and-down"></el-col>
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

.article_footer {
  text-align: center;
}

.article_praise_btn {
  border: 1px solid var(--borderColor);
  background-color: var(--bgColor);
  width: 200px;
  height: 50px;
  border-radius: 50px;
  color: var(--fontColor);
  font-size: 20px;
  transition: all 0.5s;
}

.article_praised_btn, .article_praise_btn:hover {
  border: 1px solid var(--mainThemeColor);
  background-color: var(--mainThemeColor);
  color: #FFF;
}


.article_praise_btn i {
  font-size: 20px;
}
</style>
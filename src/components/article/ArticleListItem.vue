<script setup lang="ts">
import {ArticleItem} from "../../types/ArticleItem.ts";

const props = defineProps({
  articleItem: {type: ArticleItem, default: null}
})
</script>

<template>
<el-row>
  <el-col v-if="articleItem.hasCoverImg()" :span="8">
    <router-link :to="{name: 'ArticleDetail', params: { id: articleItem.articleId }}">
      <div class="cover-img">
        <img v-lazy="articleItem.coverImg"/>
      </div>
    </router-link>
  </el-col>
</el-row>
</template>

<style scoped>

</style>
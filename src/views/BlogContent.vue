<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getContentByRouter} from "../api/common.ts";

const contentName = ref<string>('')
const contentHtml = ref<string>('')

const route = useRoute()

onMounted(() => getContent())

function getContent() {
  getContentByRouter(route.path, route.params.pathMatch).then(res => {
    contentName.value = res.data.name
    contentHtml.value = res.data.html
  })
}
</script>

<template>
  <div class="blog_content">
    <el-row type="flex" justify="center">
      <el-col :lg="12" :md="16" :sm="22" :xs="22">
        <div class="content-preview" v-html="contentHtml"></div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>
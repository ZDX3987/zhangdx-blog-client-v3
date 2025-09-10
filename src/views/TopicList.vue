<script setup lang="ts">

import {onMounted, ref} from "vue";
import {TopicItem} from "../types/TopicItem.ts";
import {getTopicByPage} from "../api/topicApi.ts";
import {ResultPage} from "../types/ResultPage.ts";
import TopicCard from "../components/topic/TopicCard.vue";

const topicList = ref<TopicItem[]>()
const pageSize: number = 15
const currentPage = ref<number>(1)

onMounted(() => {
  queryTopicList(currentPage.value)
})

function queryTopicList(queryPage: number) {
  getTopicByPage(queryPage, pageSize).then(res => {
    topicList.value = ResultPage.build(res.data, TopicItem).records
    currentPage.value = queryPage
  })
}
</script>

<template>
<div class="topic_content">
  <el-row type="flex" justify="center">
    <el-col :lg="16" :md="20" :xs="22" :sm="22">
      <el-row>
        <el-col :md="{span: 11, offset: 0}" :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}"
          v-for="topic in topicList" :key="topic.id">
            <TopicCard :topic-item="topic"/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.topic_content {
  padding-bottom: 20px;
}
</style>
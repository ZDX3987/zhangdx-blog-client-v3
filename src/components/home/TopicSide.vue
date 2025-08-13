<script setup lang="ts">

import {onMounted, ref} from "vue";
import {dateFormat} from "../../utils/moment-date.ts";
import {getSimpleTopic} from "../../api/topicApi.ts";
import {TopicItem} from "../../types/TopicItem.ts";
import {ResultPage} from "../../types/ResultPage.ts";

const topicList = ref<TopicItem[]>([])

onMounted(() => {
  getSimpleTopic(1, 5).then(res => {
    topicList.value = ResultPage.build(res.data, TopicItem).records
  })
})
</script>

<template>
  <div class="topic_card_content">
    <div class="topic_card_title">
      <span><i class="iconfont iconzhuanlan1"></i>&nbsp;最新专题</span>
      <RouterLink :to="{name: 'TopicList'}">
        <el-link underline="never">更多&gt;</el-link>
      </RouterLink>
    </div>
    <div class="topic_card_list">
      <ul>
        <li v-for="topic of topicList" :key="topic.id">
          <RouterLink class="topic_name" :to="{name: 'TopicDetail', params: { id: topic.id } }">
            {{topic.title}}
          </RouterLink>
          <span class="topic_date">
            {{ dateFormat(topic.updateDate, 'yyyy-MM-DD') }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.topic_card_content {
  background-color: var(--bgColor);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  margin-bottom: 20px;
}
.topic_card_title {
  height: 50px;
  border-bottom: 1px solid var(--borderColor);
  font-size: 18px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}

.topic_card_list {
  min-height: 250px;
  text-align: left;
}
.topic_card_list ul {
  padding-left: 0;
  margin: 0;
}
.topic_card_list li {
  list-style: none;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid var(--bodyBgColor);
  padding: 0 20px;
}

.topic_name {
  color: var(--aColor);
  text-decoration: none;
  transition: all 0.5s;
  font-size: 14px;
  font-weight: 600;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.topic_name:hover {
  color: var(--mainThemeColor);
}
.topic_date {
  color: var(--subFontColor);
  font-size: 14px;
  width: 40%;
  float: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}
</style>
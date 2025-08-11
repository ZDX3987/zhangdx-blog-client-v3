<script setup lang="ts">

import {onMounted, ref} from "vue";
import {dateFormat} from "../../utils/moment-date.ts";
import {getSimpleTopic} from "../../api/topicApi.ts";
import {genData} from "../../utils/api-util.ts";

const topicList = ref([])

onMounted(async () => {
  topicList.value = await genData(getSimpleTopic(1, 5))
})
</script>

<template>
  <div class="topic_card_content">
    <div class="topic_card_title">
      <span><i class="fa fa-tags"></i>&nbsp;最新专题</span>
      <el-link underline="never">更多&gt;</el-link>
    </div>
    <div class="topic_card_list">
      <ul>
        <li v-for="topic of topicList" :key="topic.id">
          <RouterLink :to="{name: 'TopicDetail', params: { id: topic.id } }">
            {{topic.title}}
          </RouterLink>
          <span>
            {{dateFormat(topic.updateDate, 'yyyy-MM-dd')}}
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
  padding: 0 20px;
  min-height: 300px;
  text-align: left;
}
.topic_card_list li {
  list-style: none;
}

.topic_card_list a {
  color: var(--aColor);
  text-decoration: none;
  transition: all 0.5s;
  font-size: 15px;
  width: 60%;
}

.topic_card_list a:hover {
  color: var(--mainThemeColor);
}

.topic_card_list span {
  color: var(--subFontColor);
  font-size: 14px;
  width: 40%;
}
</style>
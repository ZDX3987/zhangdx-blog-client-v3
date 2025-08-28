<script setup lang="ts">

import {onMounted, ref} from "vue";
import {ArchivesTimeline} from "../../types/ArchivesTimeline.ts";
import {getArchivesTimeline} from "../../api/articleApi.ts";

const timeline = ref<ArchivesTimeline[]>([])
const queryDateStr = ref<string>('')
const activeCollapseItem = ref<string>('0')

const emit = defineEmits(['query-date'])

onMounted(() => {
  queryTimeline()
})

function queryTimeline() {
  getArchivesTimeline().then(res => {
    timeline.value = res.data
    setDefaultQueryDateStr()
  })
}

function setDefaultQueryDateStr() {
  let queryDateList =  timeline.value
  if (queryDateList.length === 0) {
    return
  }
  let firstArchivesTimeline = queryDateList[0];
  queryDateStr.value = firstArchivesTimeline.title
  selectTimeline(firstArchivesTimeline.nodes[0].timeline)
}

function selectTimeline(dateStr: string) {
  queryDateStr.value = dateStr
  emit('query-date', dateStr)
}
</script>

<template>
  <div class="archives_timeline">
<!--    <timeline-skeleton v-if="loading"></timeline-skeleton>-->
    <el-collapse class="timeline_collapse" v-model="activeCollapseItem" :accordion="true">
      <el-collapse-item v-for="(value, index) of timeline" :key="value.title"
                        :title="value.title + '（' + value.nodes.length + '）' " :name="index + ''"
                        class="timeline_title">
        <div class="timeline_item" :class="queryDateStr === timeline.timeline ? 'timeline_item_active' : ''"
             v-for="timeline of value.nodes" :key="timeline.timeline"
             @click="selectTimeline(timeline.timeline)">
          {{ timeline.timeline + '（' + timeline.count + '）' }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.archives_timeline {
  margin-bottom: 30px;
}

.archives_timeline >>> .el-collapse-item__wrap,
.archives_timeline >>> .el-collapse-item__header {
  color: var(--fontColor);
  background-color: var(--bgColor);
  border-color: var(--borderColor);
  font-size: 20px;
}

.timeline_collapse {
  border-color: var(--borderColor);
}

.timeline_item {
  color: var(--fontColor);
  padding-left: 20%;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
}

.timeline_item_active {
  color: var(--mainThemeColor);
}
</style>
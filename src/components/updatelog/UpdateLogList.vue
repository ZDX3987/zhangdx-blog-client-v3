<script setup lang="ts">

import {nextTick, onMounted, reactive, ref} from "vue";
import {UpdateLog} from "../../types/UpdateLog.ts";
import {dateFormat} from "../../utils/moment-date.ts";
import {getUpdateLogByPage} from "../../api/common.ts";
import {ResultPage} from "../../types/ResultPage.ts";
import VditorPreview from 'vditor/dist/method.min'
import "vditor/dist/index.css";

const updateLogList = reactive<UpdateLog[]>([])
const pageSize = ref<number>(3)
const currentPage = ref<number>(1)
const queryStatus = ref<number[]>([3])
const total = ref<number>(0)
const loading = ref<boolean>(false)

onMounted(() => {
  VditorPreview.mermaidRender(document)
  query(currentPage.value)
})

function query(queryPage: number) {
  loading.value = true
  getUpdateLogByPage(pageSize.value, queryPage, queryStatus.value).then(res => {
    let resultPage = ResultPage.build(res.data, UpdateLog);
    updateLogList.push(...resultPage.records)
    renderUpdateLog(resultPage.records)
    total.value = resultPage.total
    currentPage.value = queryPage
    loading.value = false
  })
}

function renderUpdateLog(list: UpdateLog[]) {
  nextTick(() => {
    list.forEach(log => {
      let el: HTMLElement | null = document.getElementById('update-log-' + log.id)
      if (el === null) {
        return
      }
      VditorPreview.preview(el, log.content, {})
    })
  })
}
</script>

<template>
  <div class="update_list">
    <el-timeline>
      <el-timeline-item v-for="log of updateLogList" :key="log.id" :timestamp="dateFormat(log.updateDate, 'yyyy/MM/DD')" placement="top">
        <el-card class="log_card">
          <h4>{{log.title}}</h4>
          <p>ZHANGDX 提交于 {{dateFormat(log.updateDate)}}</p>
          <div :id="'update-log-' + log.id" class="log_text"></div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div class="load_more">
      <el-button type="text" v-if="updateLogList.length < total" :disabled="loading" @click="query(currentPage + 1)">{{ loading ? '加载中...' : '加载更多' }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.update_list {
  background-color: var(--bgColor);
  text-align: left;
  padding: 30px 50px;
  margin-bottom: 30px;
  margin-top: 30px;
  min-height: 50vh;
}

.load_more {
  text-align: center;
  color: var(--mainThemeColor);
}

.log_card {
  background-color: var(--bgColor);
  border-color: var(--borderColor);
  color: var(--fontColor);
}
.log_card h4 {
  margin: 0;
  font-size: 24px;
  font-weight: inherit;
}
.log_card a {
  color: var(--fontColor);
  text-decoration: none;
  transition: all 0.5s;
}
.log_text {
  color: var(--fontColor);
}
</style>
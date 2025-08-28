<script setup lang="ts">

import {ref} from "vue";
import ArchivesTimeline from "../components/archives/ArchivesTimeline.vue";
import ArchivesList from "../components/archives/ArchivesList.vue";

const queryDateStr = ref<string>('')

function setQueryDateStr(dateStr: string) {
  queryDateStr.value = dateStr
}
</script>

<template>
  <el-row type="flex" justify="center">
    <el-col :lg="14" :md="20" :sm="22" :xs="22" class="archives_content">
      <el-row>
        <el-col :md="6" :sm="6" :xs="24">
          <ArchivesTimeline @query-date="setQueryDateStr"></ArchivesTimeline>
        </el-col>
        <el-col :md="18" :sm="18" :xs="24">
          <ArchivesList v-if="queryDateStr"
                         :query-date-str="queryDateStr"></ArchivesList>
<!--          <archives-skeleton v-else></archives-skeleton>-->
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>
.archives_content {
  background-color: var(--bgColor);
  margin-bottom: 30px;
  text-align: left;
  padding: 20px;
  min-height: 65vh;
}
</style>
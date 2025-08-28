<script setup lang="ts">

import UpdateLogTitle from "../components/updatelog/UpdateLogTitle.vue";
import UpdateLogList from "../components/updatelog/UpdateLogList.vue";
</script>

<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col>
        <UpdateLogTitle/>
      </el-col>
    </el-row>
    <el-row class="my-2"></el-row>
    <el-row  type="flex" justify="center">
      <el-col :lg="12" :md="14" :sm="22" :xs="22">
        <UpdateLogList/>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>
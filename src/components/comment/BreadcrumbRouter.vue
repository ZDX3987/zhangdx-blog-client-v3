<script setup lang="ts">

import {useRoute} from "vue-router";
import {ArrowRight} from "@element-plus/icons-vue";

const route = useRoute()

</script>

<template>
  <div class="breadcrumb_list">
    <el-row>
      <el-col :span="20">
        <el-breadcrumb :separator-class="ArrowRight">
          <el-breadcrumb-item v-for="item in route.matched" :key="item.name" :to="{ name: item.name }">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.breadcrumb_list {
  padding: 20px 10%;
  background-color: var(--bgColor);
  margin-bottom: 20px;
}
.breadcrumb_list >>> span {
  color: var(--fontColor);
}
</style>
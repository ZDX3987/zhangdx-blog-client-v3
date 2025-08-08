<script setup lang="ts">

</script>

<template>
  <el-skeleton animated>
    <template #template>
      <el-row>
        <el-col :sm="8">
          <el-skeleton-item class="article_img" variant="image"></el-skeleton-item>
        </el-col>
        <el-col :sm="16">
          <el-skeleton-item variant="h1"></el-skeleton-item>
          <el-skeleton-item variant="p"></el-skeleton-item>
          <el-skeleton-item variant="p"></el-skeleton-item>
          <el-skeleton-item variant="p"></el-skeleton-item>
          <el-skeleton-item variant="circle"></el-skeleton-item>
        </el-col>
      </el-row>
    </template>
  </el-skeleton>
</template>

<style scoped>
.article_img {
  height: 150px;
  width: 100%;
}
</style>
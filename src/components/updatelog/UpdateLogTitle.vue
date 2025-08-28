<script setup lang="ts">

</script>

<template>
  <div class="upload_title">
    <div class="title_mask"></div>
  </div>
</template>

<style scoped>
.upload_title {
  height: 200px;
  background-color: var(--bgColor);
}

.title_mask {
  width: 100%;
  height: 200px;
  background: url("http://file.zhangdx.cn/updatelog.jpg") no-repeat center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.9;
}
</style>
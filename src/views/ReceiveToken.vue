<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
onMounted(() => {
  let accessToken = route.query.accessToken;
  let username = route.query.username;
  if (!accessToken || !username) {
    window.opener.location.reload();
    window.close();
    return;
    // TODO 还未完成逻辑
  }
})
</script>

<template>
<div>
  登录成功
</div>
</template>

<style scoped>

</style>
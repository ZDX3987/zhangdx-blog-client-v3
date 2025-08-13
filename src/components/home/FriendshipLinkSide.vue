<script setup lang="ts">
import {randomColor} from "../../utils/common-util.ts";
import {onMounted, ref} from "vue";
import {FriendshipLink} from "../../types/FriendshipLink.ts";
import {genData} from "../../utils/api-util.ts";
import {getAllFriendshipLink} from "../../api/friendshipLinkApi.ts";

const friendshipLinkList = ref<FriendshipLink[]>([])

onMounted(async () => {
  friendshipLinkList.value = await genData(getAllFriendshipLink())
})
</script>

<template>
<div class="friendship_link_content">
  <div class="friendship_link_header">
    <span><i class="iconfont iconlianjie"></i>&nbsp;友链列表</span>
    <RouterLink :to="{name: 'FriendshipLink'}">
      <el-link :underline="false">更多&gt;</el-link>
    </RouterLink>
  </div>
  <div class="friendship_link_body">
    <ul class="friendship_link_list" v-if="friendshipLinkList.length !== 0">
      <li v-for="(link, i) of friendshipLinkList" :key="i" class="m-3 d-inline-block">
        <a target="_blank" :style="{color: randomColor()}" :href="link.linkUrl">{{ link.linkName }}</a>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped>
.friendship_link_content {
  background-color: var(--bgColor);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.friendship_link_header {
  height: 50px;
  border-bottom: 1px solid var(--borderColor);
  font-size: 18px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}

.friendship_link_header a {
  text-decoration: none;
}

.friendship_link_body {
  text-align: left;
  font-size: 15px;
  color: var(--fontColor);
  padding: 10px 0;
}

.friendship_link_list {
  list-style: none;
  padding-left: 10px;
}

.friendship_link_list li {
  font-size: 16px;
  display: inline-block;
  margin: 20px;
}

.friendship_link_list a {
  text-decoration: none;
  transition: all 0.5s;
}

.friendship_link_list li a:hover {
  color: var(--mainThemeColor) !important;
}
</style>
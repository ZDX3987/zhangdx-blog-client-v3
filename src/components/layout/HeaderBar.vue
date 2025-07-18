<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import MenuBar from "./MenuBar.vue";
import {useMainStore} from "../../stores/mobileMenu.ts";
import type {MenuItem} from "../../types/MenuItem.ts";
import {getMenuList} from "../../api/common.ts";

const headerBarTitle = ref('ZHANGDX')
const headerLayout = ref({
  leftBar: {
    sm: 2,
    xs: 2
  },
  title: {
    md: {offset: 2, span: 2},
    sm: {offset: 7, span: 6},
    xs: {offset: 7, span: 6}
  },
  menuBar: {
    md: {offset: 2, span: 12}
  },
  rightBar: {
    md: {offset:3, span: 3},
    sm: {offset:6, span: 3},
    xs: {offset:2, span: 7}
  }
})
const mainStore = useMainStore()
const mobileMenuShowed = computed(() => {
  return mainStore.$state.mobileMenuShowed
})

const menuList = ref<MenuItem[]>([])

onMounted(async () => {
  await getMenuList().then(res => menuList.value = res.data)
})

function showMobileMenu() {
  mainStore.showMobileMenu(!mobileMenuShowed.value)
}
</script>
<template>
<div class="header_bar_content">
  <el-row type="flex" align="middle" justify="center">
    <el-col class="hidden-md-and-up" :sm="headerLayout.leftBar.sm" :xs="headerLayout.leftBar.xs">
      <span class="mobile_toggler_icon iconfont" @click.stop="showMobileMenu" :class="mobileMenuShowed ? 'iconclose' : 'iconmenu'"></span>
    </el-col>
    <el-col :md="headerLayout.title.md" :sm="headerLayout.title.sm" :xs="headerLayout.title.xs">
      <RouterLink class="header_bar_title_common" :to="{name: 'Home'}">
        <span class="header_bar_title_common header_bar_title">{{headerBarTitle}}</span>
      </RouterLink>
    </el-col>
    <el-col class="hidden-sm-and-down" :md="headerLayout.menuBar.md">
      <MenuBar :is-mobile-menu="false" :menu-list="menuList"></MenuBar>
    </el-col>
    <el-col :md="headerLayout.rightBar.md" :sm="headerLayout.rightBar.sm" :xs="headerLayout.rightBar.xs">
      <el-tooltip placement="bottom">
        <span class="right-bar-icon iconfont icontaiyang1"></span>
      </el-tooltip>
      <span class="right-bar-icon iconfont iconfangdajing"></span>
    </el-col>
  </el-row>
  <el-collapse-transition>
    <MenuBar class="hidden-md-and-up" v-show="mobileMenuShowed" :menu-list="menuList" :is-mobile-menu="true"></MenuBar>
  </el-collapse-transition>
</div>
</template>

<style scoped>
.header_bar_content {
  background-color: var(--bgColor);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  text-align: center;
}

.header_bar_title {
  height: 100%;
  font-weight: bold;
  background-image: linear-gradient(to right, #17b3a1, #e0142b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header_bar_title_common {
  margin-right: 0;
  padding: .3125rem 0;
  font-size: 1.25rem;
  line-height: inherit;
  display: inline-block;
}
.mobile_toggler_icon {
  color: var(--fontColor);
}
.right-bar-icon {
  color: var(--fontColor);
  font-size: 20px;
}
</style>
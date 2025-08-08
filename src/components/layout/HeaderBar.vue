<script setup lang="ts">
import {computed, type ComputedRef, onMounted, ref} from "vue";
import MenuBar from "./MenuBar.vue";
import {useMainStore} from "../../stores/store.ts";
import type {MenuItem} from "../../types/MenuItem.ts";
import {getMenuList, logout} from "../../api/common.ts";
import type {UserInfo} from "../../types/UserInfo.ts";
import {ThemeEnum} from "../../types/ThemeEnum.ts";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {removeAuthorization} from "../../utils/auth-storage.ts";
import SearchBar from "./SearchBar.vue";

const headerLayout = {
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
}
const router = useRouter()
const store = useMainStore()
const headerBarTitle = computed(() => {
  return store.blogName
})
const mobileMenuShowed = computed(() => {
  return store.mobileMenuShowed
})
const userInfo: ComputedRef<UserInfo | null> = computed(() => {
  return store.userInfo
})
const currentTheme: ComputedRef<ThemeEnum> = computed(() => {
  return store.theme
})
const showSearchBar = computed(() => {
  return store.showSearchBar
})
const menuList = ref<MenuItem[]>([])

onMounted(async () => {
  await getMenuList().then(res => menuList.value = res.data)
})

function showMobileMenu() {
  store.showMobileMenu(!mobileMenuShowed.value)
}
function toggleTheme() {
  let newTheme = currentTheme.value === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT
  store.toggleTheme(newTheme)
}
function showLoginDialog() {
  store.toggleLoginDialog(true)
}
function openSearchBar() {
  store.toggleShowSearchBar(!showSearchBar.value)
}
function userInfoCommand(command: string) {
  switch(command) {
    case 'userCenter':
      router.push({name: 'UserCenter'})
      break
    case 'logout':
      logout().then(res => {
        store.updateUserInfo(null)
        removeAuthorization()
        router.push({name: 'Home'})
        ElMessage.success(res.msg)
      })
      break
  }
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
      <el-tooltip placement="bottom" :effect="currentTheme === 'light' ? 'dark' : 'light'" :content="currentTheme === 'light' ? '切换至黑夜' : '切换至白天'">
        <span class="right_bar_icon iconfont " :class="currentTheme === 'light' ? 'iconbaitian-qing' : 'iconyewan'" @click="toggleTheme"></span>
      </el-tooltip>
      <span class="right_bar_icon iconfont iconsousuo_sousuo" @click.stop="openSearchBar"></span>
      <el-dropdown v-if="userInfo" @command="userInfoCommand">
        <span class="el-dropdown-link">
          <el-avatar class="user_avatar" :src="userInfo.avatar" :title="userInfo.nickname"></el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item class="iconfont icondenglu" command="userCenter">&nbsp;个人中心</el-dropdown-item>
            <el-dropdown-item class="iconfont icontuichudenglu" command="logout">&nbsp;退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span v-else class="right_bar_icon iconfont icondenglu" @click="showLoginDialog"></span>
    </el-col>
  </el-row>
  <el-collapse-transition>
    <MenuBar class="hidden-md-and-up" v-show="mobileMenuShowed" :menu-list="menuList" :is-mobile-menu="true"></MenuBar>
  </el-collapse-transition>
  <el-collapse-transition>
    <SearchBar v-show="showSearchBar"/>
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
.right_bar_icon {
  color: var(--fontColor);
  font-size: 20px;
  margin-right: 10px;
}
.user_avatar {
  width: 30px;
  height: 30px;
}
</style>
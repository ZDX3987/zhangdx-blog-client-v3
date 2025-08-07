<script setup lang="ts">

import {ref} from "vue";
import type {MenuItem} from "../../types/MenuItem.ts";
import {useRoute} from "vue-router";

const props = defineProps({
  isMobileMenu: {type: Boolean, default: false},
  menuList: {type: Array<MenuItem>, default: []}
})
const route = useRoute()

const subMenuShowId = ref(-1)


function showSubMenu(menu: MenuItem) {
  if (!menu.childrenMenu || menu.childrenMenu.length === 0) {
    return
  }
  subMenuShowId.value = menu.id
}
function hideSubMenu() {
  subMenuShowId.value = -1
}
function computeActiveClass(menu: MenuItem) {
  return route.path === menu.router ? 'active' : ''
}

</script>

<template>
<div class="menu_content">
  <nav>
    <ul class="nav_list_common" :class="isMobileMenu ?  'mobile_nav_list' : 'desktop_nav_list'">
      <li class="nav_item_common" :class="computeActiveClass(menu)" v-for="menu of menuList" :key="menu.id" @mouseenter="showSubMenu(menu)" @mouseleave="hideSubMenu">
        <RouterLink class="nav_link" :to="{path: menu.router}" :id="'menu_' + menu.id">
          <span :class="menu.iconClass"></span>&nbsp;{{ menu.text }}
          <span v-if="menu.childrenMenu.length > 0" class="nav_sub_icon iconfont iconxiangxia"></span>
        </RouterLink>
        <el-collapse-transition>
          <ul v-show="subMenuShowId === menu.id" class="nav_list_common nav_sub_list_common" v-if="menu.childrenMenu.length > 0">
            <li class="nav_item_common nav_sub_item" v-for="subMenu of menu.childrenMenu" :key="subMenu.id">
              <RouterLink class="nav_link" :to="{path: subMenu.router}" :id="'menu_' + subMenu.id">
                <span :class="subMenu.iconClass"></span>&nbsp;{{ subMenu.text }}
              </RouterLink>
            </li>
          </ul>
        </el-collapse-transition>
      </li>
    </ul>
  </nav>
</div>
</template>

<style scoped>
.menu_content {
  text-align: left;
}
.nav_list_common {
  background-color: var(--bgColor);
  list-style: none;
  margin: 0;
  z-index: 1000;
}
.nav_sub_icon {
  display: inline-block;
  transition: transform 0.2s ease-in-out;
}
.nav_item_common:hover .nav_sub_icon {
  transform: rotate(180deg);
}

a {
  text-decoration: none;
  color: var(--fontColor) !important;
}

.active a {
  color: var(--mainThemeColor) !important;
}
a:hover {
  color: var(--mainThemeColor) !important;
  background-color: var(--bgColor) !important;
  text-decoration: none;
}
/*移动端菜单样式*/
.mobile_nav_list {
  width: 100%;
}

/*桌面端菜单样式*/
.desktop_nav_list .nav_sub_list_common {
  list-style: none;
  position: fixed;
  padding: 0;
  min-width: 120px;
  background-color: var(--bgColor);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.desktop_nav_list .nav_item_common {
  float: left;
}
.desktop_nav_list .nav_sub_item {
  width: 100%;
  border-bottom: 1px solid var(--borderColor);
}
.nav_link {
  display: block;
  padding: .5rem 1rem;
}
</style>
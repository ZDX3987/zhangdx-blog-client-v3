<script setup lang="ts">

import {computed, onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  containerRef: {type: String, default: 'article_text'},
  anchorEl: {type: Array<String>, default: ['h2', 'h3', 'h4', 'h5', 'h6']}
})
const catalogMap = ref<Map<string, Object>>(new Map())

const innerAnchorTag = computed(() => {
  return props.anchorEl.map(e => e.toUpperCase())
})

const activeAnchorElId = ref<string>('')
let anchorOffsetTopMap: Map<number, string> = new Map()


onMounted(() => {
  parseAnchorEl();
  window.addEventListener('scroll', calAnchorScrollHeight)
})
onUnmounted(() => {
  window.removeEventListener('scroll', calAnchorScrollHeight)
})

function calAnchorScrollHeight(event) {
  const scrollDistance = window.scrollY
      || document.documentElement.scrollTop
      || document.body.scrollTop
  let currentKey
  for (let key of anchorOffsetTopMap.keys()) {
    if (scrollDistance >= key) {
      currentKey = key
    } else {
      break
    }
  }
  activeAnchorElId.value = anchorOffsetTopMap.get(currentKey)
}
function parseAnchorEl() {
  let containerEl = document.getElementById(props.containerRef)
  if (containerEl === null) {
    return
  }
  let nodeList = containerEl.querySelectorAll(innerAnchorTag.value)
  for (let i = 0; i < nodeList.length; i++) {
    let itemEl = nodeList[i]
    if (itemEl === null) {
      continue
    }
    let index = innerAnchorTag.value.indexOf(itemEl.tagName)
    catalogMap.value.set(itemEl.id, {offset: 20 * index, text: itemEl.innerText})
    anchorOffsetTopMap.set(itemEl.offsetTop, itemEl.id)
  }
}

function catalogHref(elId: string) {
  let el = document.getElementById(elId)
  if (el === null) {
    return
  }

  window.scrollTo({top: el.offsetTop, behavior: 'smooth' })
}
</script>

<template>
<div class="catalog_wrapper">
  <div class="catalog_content">
    <div class="catalog_header">
      <span>目录</span>
    </div>
    <div class="catalog_list">
      <ul>
        <li v-for="(value, index) in catalogMap">
          <span :class="activeAnchorElId === value[0] ? 'active_item' : ''" :style="{'padding-left':  value[1].offset + 'px'}" @click="catalogHref(value[0])">{{value[1].text}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped>
.catalog_wrapper {
  position: fixed;
}
.catalog_content {
  background-color: var(--bgColor);
  padding: 20px;
}
.catalog_list ul {
  padding: 0;
}
.catalog_list li {
  list-style: none;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  cursor: pointer;
  padding-left: 10px;
}
.catalog_list li:hover {
  background-color: var(--bodyBgColor);
}
.active_item {
  color: var(--mainThemeColor);
}
</style>
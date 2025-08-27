<script setup lang="ts">

import {computed, onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  containerRef: {type: String, default: 'article_text'},
  anchorEl: {type: Array<String>, default: ['h2', 'h3', 'h4', 'h5', 'h6']}
})
const containerElRef = ref<HTMLElement | null>(null)
const catalogMap = ref<Map<string, Object>>(new Map())

const innerAnchorTag = computed(() => {
  return props.anchorEl.map(e => e.toUpperCase())
})

const activeAnchorElId = ref<string>('')
let anchorOffsetTopMap: Map<number, string> = new Map()

const catalogMovePosition = ref<number>(1)
let catalogTotalHeight: number = 0

onMounted(() => {
  parseAnchorEl();
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll(event) {
  calAnchorScrollHeight()
  handleCatalogAutoListScroll(event)
}

function calAnchorScrollHeight() {
  const scrollDistance = window.scrollY
      || document.documentElement.scrollTop
      || document.body.scrollTop
  let currentKey: number
  for (let key of anchorOffsetTopMap.keys()) {
    if (scrollDistance >= key) {
      currentKey = key
    } else {
      break
    }
  }
  let value = anchorOffsetTopMap.get(currentKey);
  if (value !== undefined) {
    activeAnchorElId.value = value
  }
}
function parseAnchorEl() {
  let containerEl = document.getElementById(props.containerRef)
  if (containerEl === null) {
    return
  }
  containerElRef.value = containerEl
  let nodeList = containerEl.querySelectorAll(innerAnchorTag.value)
  for (let i = 0; i < nodeList.length; i++) {
    let itemEl = nodeList[i]
    if (itemEl === null) {
      continue
    }
    let index = innerAnchorTag.value.indexOf(itemEl.tagName)
    catalogMap.value.set(itemEl.id, {offset: 20 * index, text: itemEl.innerText, fontWeight: 600 - 100 * (index + 1)})
    anchorOffsetTopMap.set(itemEl.offsetTop, itemEl.id)
    if (i === 0) {
      activeAnchorElId.value = itemEl.id
    }
  }
}

function catalogHref(elId: string) {
  let el = document.getElementById(elId)
  if (el === null) {
    return
  }
  window.scrollTo({top: el.offsetTop, behavior: 'smooth' })
}

const catalogListRef = ref(null)
function handleCatalogAutoListScroll(event) {
  handleCatalogInnerScroll(event)
  handleCatalogListPosition()
}

function handleCatalogInnerScroll(event) {
  const sideCatalogRef = catalogListRef
  if (sideCatalogRef.value === null || event.target === sideCatalogRef.value) {
    return;
  }
  let catalogActiveList =  document.getElementsByClassName('active_item')
  if (catalogActiveList.length !== 1) {
    return;
  }
  let catalogActiveRef = catalogActiveList[0]
  let offsetTop = catalogActiveRef.offsetTop
  sideCatalogRef.value.scrollBy({
    top: offsetTop > 300 ? offsetTop : -offsetTop,
    behavior: 'smooth'
  });
}

function handleCatalogListPosition() {
  let containerEl = containerElRef.value
  if (containerEl === null) {
    return;
  }
  const scrollTop = window.scrollY
  let catalogWrapperEl: Element = document.getElementsByClassName('catalog_wrapper')[0]
  let containerElTop = scrollTop + containerEl.getBoundingClientRect().top
  let catalogClientRect = catalogWrapperEl.getBoundingClientRect();
  if (catalogTotalHeight === 0) {
    catalogTotalHeight = catalogClientRect.height + catalogClientRect.top;
  }
  if (containerEl.offsetHeight - (scrollTop - containerElTop) < catalogTotalHeight) {
    let top = containerEl.offsetHeight + containerEl.offsetTop - catalogClientRect.height
    catalogMovePosition.value = 2
    catalogWrapperEl.setAttribute('style', 'top: ' + top + 'px')
  } else {
    catalogMovePosition.value = 1
    catalogWrapperEl.removeAttribute('style')
  }
}
</script>

<template>
<div class="catalog_wrapper" :class="catalogMovePosition === 1 ? 'catalog_wrapper_fixed' : 'catalog_wrapper_absolute'">
  <div class="catalog_content">
    <div class="catalog_header">
      <span>目录</span>
    </div>
    <div class="catalog_list" ref="catalogListRef">
      <ul>
        <li v-for="(value) in catalogMap" @click="catalogHref(value[0])">
          <span :class="activeAnchorElId === value[0] ? 'active_item' : ''"
                :style="{paddingLeft:  value[1].offset + 'px', fontWeight: value[1].fontWeight}">
            <i v-if="activeAnchorElId === value[0]" class="iconfont iconchichi"></i>
            {{value[1].text}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped>
.catalog_wrapper_fixed {
  position: fixed;
}
.catalog_wrapper_absolute {
  position: absolute;
}
.catalog_content {
  background-color: var(--bgColor);
  padding: 20px 0 20px 20px;
  width: 240px;
}
.catalog_list {
  max-height: 500px;
  overflow-y: auto;
}
.catalog_list ul {
  padding: 0;
  width: 100%;
}
.catalog_list li {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  cursor: pointer;
  padding-left: 10px;
  width: 100%;
}
.catalog_list li:hover {
  background-color: var(--bodyBgColor);
}
.catalog_list li span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.active_item {
  color: var(--mainThemeColor);
}
</style>
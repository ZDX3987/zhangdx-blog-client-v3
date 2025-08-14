<script setup lang="ts">

import {computed, ref} from "vue";
const showPrevMore = ref<boolean>(false)
const showNextMore = ref<boolean>(false)
const prevIconClass = ref<string>('iconshenglve')
const nextIconClass = ref<string>('iconshenglve')
const props = defineProps({
  currentPage: {type: Number, default: 1},
  pageSize: {type: Number, default: 10},
  total: {type: Number, default: 0},
  pageCount: {type: Number, default: 0},
  pagerCount: {type: Number, default: 7},
})
const internalPageCount = computed(() => {
  if (props.total !== 0) {
    return Math.max(1, Math.ceil(props.total / props.pageSize));
  } else if (props.pageCount !== 0) {
    return Math.max(1, props.pageCount);
  }
  return 0;
})
const pagers = computed(() => {
  let pagerCount = props.pagerCount
  let halfPagerCount = (pagerCount - 1) / 2
  let currentPage = props.currentPage
  let pageCount = internalPageCount.value
  let currentShowPrevMore = false
  let currentShowNextMore = false
  if (pageCount > pagerCount) {
    if (currentPage > pagerCount - halfPagerCount) {
      currentShowPrevMore = true;
    }
    if (currentPage < pageCount - halfPagerCount) {
      currentShowNextMore = true;
    }
  }
  let pagerArray: number[] = []
  let startPager = 2, endPager;
  if (currentShowPrevMore && !currentShowNextMore) {
    startPager = pageCount - (pagerCount - 2);
    endPager = pageCount - 1;
  } else if (!currentShowPrevMore && currentShowNextMore) {
    endPager = pagerCount - 1;
  } else if (currentShowPrevMore && currentShowNextMore) {
    let offset = Math.floor(pagerCount / 2) - 1;
    startPager = currentPage - offset;
    endPager = currentPage + offset
  } else {
    endPager = pageCount - 1;
  }
  for (let i = startPager; i <= endPager; i++) {
    pagerArray.push(i);
  }
  showPrevMore.value = currentShowPrevMore;
  showNextMore.value = currentShowNextMore;
  return pagerArray;
})

const emit = defineEmits(['current-change'])

function onPagerClick(event) {
  let target = event.target
  let newPage = Number(event.target.textContent);
  let pageCount = internalPageCount.value
  let currentPage = props.currentPage
  let pagerCountOffset = props.pagerCount - 2
  if (target.className.indexOf('pager_more_prev') !== -1) {
    newPage = currentPage - pagerCountOffset;
  } else if (target.className.indexOf('pager_more_next') !== -1) {
    newPage = currentPage + pagerCountOffset;
  }
  if (!isNaN(newPage)) {
    if (newPage < 1) {
      newPage = 1;
    }

    if (newPage > pageCount) {
      newPage = pageCount;
    }
  }
  if (newPage !== currentPage) {
    emit('current-change', newPage);
  }
}
function prev() {
  let newPage = props.currentPage - 1;
  if (newPage < 1) {
    newPage = 1;
  }
  emit('current-change', newPage);
}
function next() {
  let newPage = props.currentPage + 1;
  if (newPage > internalPageCount.value) {
    newPage = internalPageCount.value;
  }
  emit('current-change', newPage);
}

function directionMouseenter(direction: string) {
  if (direction === 'prev') {
    prevIconClass.value = 'iconicon_paging_left';
  } else {
    nextIconClass.value = 'iconicon_paging_right';
  }
}
</script>

<template>
  <div class="page_content">
    <ul class="pager_list">
      <li>
        <button type="button" :disabled="currentPage <= 1" @click="prev">
          <i class="iconfont iconpage-right"></i>
        </button>
      </li>
      <li v-if="internalPageCount > 0" :class="{'current_pager': currentPage === 1}" @click="onPagerClick">
        <button type="button">1</button>
      </li>
      <li class="pager_more_prev iconfont" :class="prevIconClass" @click="onPagerClick" @mouseenter="directionMouseenter('prev')" @mouseleave="prevIconClass = 'iconshenglve'"
          v-if="showPrevMore"></li>
      <li v-for="pager in pagers" :key="pager" :class="{'current_pager': currentPage === pager}" @click="onPagerClick">
        <button type="button">{{ pager }}</button>
      </li>
      <li class="pager_more_next iconfont" :class="nextIconClass" @click="onPagerClick" @mouseenter="directionMouseenter('next')" @mouseleave="nextIconClass = 'iconshenglve'"
          v-if="showNextMore"></li>
      <li v-if="internalPageCount > 1" @click="onPagerClick" :class="{'current_pager': currentPage === internalPageCount}">
        <button type="button">{{ internalPageCount }}</button>
      </li>
      <li>
        <button type="button" :disabled="currentPage === internalPageCount" @click="next">
          <i class="iconfont iconleft"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page_content {
  text-align: center;
}
.page_content button {
  background-color: var(--bgColor);
  color: var(--subFontColor);
  border: 1px solid var(--borderColor);
  height: 30px;
  width: 25px;
}
.pager_list {
  padding: 0;
}
.pager_list li {
  display: inline-block;
  margin: 0 5px;
}
.current_pager>button {
  background-color: var(--mainThemeColor);
  color: #FFF;
  border: 1px solid var(--mainThemeColor)
}
</style>
<script setup lang="ts">

import {computed, ref} from "vue";
import type {SimpleKeyLabel} from "../../types/SimpleKeyLabel.ts";
import {SearchHistoryItem} from "../../types/SearchHistoryItem.ts";
import {ElMessage} from "element-plus";
import {setStorageItem} from "../../utils/local-storage.ts";
import {useMainStore} from "../../stores/store.ts";
import {useRouter} from "vue-router";

const store = useMainStore()
const router = useRouter()
const colSpan = {
  selectBtn: {
    xl: {span: 1, offset: 8},
    sm: {span: 2, offset: 6},
    xs: {span: 4, offset: 3},
  },
  searchInput: {
    xl: {span: 6, offset: 0},
    sm: {span: 8, offset: 0},
    xs: {span: 10, offset: 0},
  },
  searchBtn: {
    xl: {span: 1, offset: 0},
    sm: {span: 2, offset: 0},
    xs: {span: 4, offset: 0},
  },
  historyList: {
    xl: {span: 6, offset: 9},
    sm: {span: 8, offset: 8},
    xs: {span: 10, offset: 7},
  }
}
const searchTypes: SimpleKeyLabel[] = [
  {key: 1, label: '文章'},
  {key: 2, label: '标签'},
  {key: 3, label: '专题'},
]
const searchForm =ref({
  searchWord: null,
  searchType: {key: 1, label: '文章'} as SimpleKeyLabel
})
const searchShowed = computed(() => {
  return store.showSearchBar
})
const searchHistoryList = ref<SearchHistoryItem[]>([])

function submitSearch(keyword: string | null, selectSearchTypeKey?: number) {
  if (!keyword || keyword === '') {
    ElMessage.warning('请输入关键字搜索');
    return;
  }
  if (selectSearchTypeKey === undefined) {
    selectSearchTypeKey = searchForm.value.searchType.key
  }
  let storeItem = new SearchHistoryItem(keyword, selectSearchTypeKey)
  storeSearchHistory(storeItem)
  closeSearch()
  router.push({name: 'SearchResult', query: {...storeItem}})
}
function storeSearchHistory(storeItem: SearchHistoryItem) {
  let currentHistoryList = searchHistoryList.value
  let existsHistoryIndex = currentHistoryList.findIndex(e => e.equals(storeItem))
  if (existsHistoryIndex !== -1) {
    currentHistoryList.splice(existsHistoryIndex, 1)
  }
  currentHistoryList.unshift(storeItem)
  searchHistoryList.value = currentHistoryList
  setStorageItem('SearchHistory', JSON.stringify(currentHistoryList))
}
function selectSearchType(searchType: SimpleKeyLabel) {
  searchForm.value.searchType = searchType;
}

function removeSearchHistory(searchHistoryItem: SearchHistoryItem) {
  let newHistoryList = searchHistoryList.value.filter(e => !e.equals(searchHistoryItem))
  searchHistoryList.value = newHistoryList
  setStorageItem('SearchHistory', JSON.stringify(newHistoryList))
}
function closeSearch() {
  searchForm.value= {
    searchWord: null,
    searchType: searchTypes[0] as SimpleKeyLabel
  }
  store.toggleShowSearchBar(false)
}
function reSearch(item: SearchHistoryItem) {
  submitSearch(item.keyword, item.searchType);
}
</script>

<template>
<div class="search_bar_content">
  <el-row class="search_bar_form">
    <el-col :xl="colSpan.selectBtn.xl" :sm="colSpan.selectBtn.sm" :xs="colSpan.selectBtn.xs">
      <el-dropdown class="search_select" @command="selectSearchType">
            <span class="search_select_btn el-dropdown-link">{{searchForm.searchType.label}}
              <i class="iconfont iconxiangxia el-icon--right"></i>
            </span>
        <template #dropdown>
          <el-dropdown-menu class="search_select_menu">
            <el-dropdown-item v-for="searchType of searchTypes" :key="searchType.key" :command="searchType">
              {{searchType.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
    <el-col :xl="colSpan.searchInput.xl" :sm="colSpan.searchInput.sm" :xs="colSpan.searchInput.xs">
      <input type="text" v-model="searchForm.searchWord" class="search_input" placeholder="请输入关键字搜索" @keyup.enter="submitSearch(searchForm.searchWord)"/>
    </el-col>
    <el-col :xl="colSpan.searchBtn.xl" :sm="colSpan.searchBtn.sm" :xs="colSpan.searchBtn.xs">
      <button type="button" class="search_btn" @click="submitSearch(searchForm.searchWord)"><i
          class="iconfont iconsousuo_sousuo"></i></button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xl="colSpan.historyList.xl" :sm="colSpan.historyList.sm" :xs="colSpan.historyList.xs">
      <div class="search_history_list">
        <span>历史搜索：</span>
        <el-tag class="search_history_item" v-for="item of searchHistoryList" type="info"
                effect="plain" closable size="small" @close="removeSearchHistory(item)"
                @click="reSearch(item)">
          {{ item.keyword }}
        </el-tag>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.search_bar_content {
  border-top: 1px solid var(--borderColor);
}
.search_bar_form {
  width: 100%;
  height: 47px;
  margin-top: 15px;
}
.search_select {
  height: 45px;
  line-height: 45px;
}
.search_select_btn {
  background-color: var(--bgColor);
  color: var(--fontColor);
}
.search_select_menu {
  background-color: var(--bgColor);
  color: var(--fontColor);
  border: var(--borderColor);
}

.search_input {
  width: 100%;
  height: 41px;
  border: 1px solid var(--borderColor);
  padding-left: 2%;
  background-color: var(--bgColor);
  color: var(--fontColor);
  font-size: 16px;
}

input:focus {
  border: 1px solid var(--mainThemeColor);
}

.search_btn {
  width: 100%;
  height: 45px;
  border: none;
  background-color: var(--mainThemeColor);
  color: var(--btnText);
  margin-left: -1px;
  transition: all 0.5s;
  font-weight: bold;
}

.search_btn:hover {
  background-color: #68cd79;
}
.search_history_list {
  text-align: left;
  font-size: 14px;
  color: var(--fontColor);
}
.search_history_item {
  margin: 5px;
  cursor: pointer;
}
</style>
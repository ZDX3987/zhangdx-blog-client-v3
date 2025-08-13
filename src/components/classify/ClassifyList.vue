<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import type {CategoryItem} from "../../types/CategoryItem.ts";
import {getCategoryPage} from "../../api/categoryApi.ts";

const currentCateId = ref(0)
const cateList = ref<CategoryItem[]>([])
const childCateList = ref<CategoryItem[]>([])
const choseParentCate = ref<CategoryItem | undefined>(undefined)
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 10
const currentChildCateId = ref(0)
const queryCateIds = ref<number[]>([])
const emit = defineEmits(['query-category'])

const parentCategoriesCount = computed(() => {
  return cateList.value.reduce((prev, current) => prev + current.articleCount, 0)
})
const childCategoriesCount = computed(() => {
  return choseParentCate.value ? choseParentCate.value.articleCount : childCateList.value.reduce((prev, current) => prev + current.articleCount, 0)
})
const displayShowMoreCateBtn = computed(() => {
  return totalPages.value > currentPage.value
})

onMounted(() => {
  doQueryCategory(currentPage.value)
})

function chooseCate(cateLevel: number, category?: CategoryItem) {
  if (cateLevel === 1) {
    const selectCateId = category ? category.id : 0;
    genChildCategories(category);
    currentChildCateId.value = 0;
    queryCateIds.value = selectCateId === 0 ? [] : [selectCateId, ...childCateList.value.map(cate => cate.id)];
    currentCateId.value = selectCateId
    choseParentCate.value = category
  } else {
    currentChildCateId.value = category ? category.id : 0;
    queryCateIds.value = category ? [category.id] : [currentCateId.value, ...childCateList.value.map(cate => cate.id)];
  }
  emit('query-category', queryCateIds.value)
}

function showMoreCate() {
  doQueryCategory(++currentPage.value)
}

function doQueryCategory(currentPage: number) {
  getCategoryPage(pageSize, currentPage, 1).then(res => {
    const data = res.data;
    totalPages.value = data.pages;
    cateList.value = cateList.value.concat(data.records)
  })
}

function genChildCategories(category: CategoryItem | undefined) {
  childCateList.value = category ? category.childCateList : [];
}
</script>

<template>
  <div class="classify_list_content">
    <el-row class="parent_cate_list" type="flex" justify="center">
      <el-col :span="20">
        <ul>
          <li :class="currentCateId === 0 ? 'active_cate_li' : ''" @click="chooseCate(1)">
            <span>全部（{{parentCategoriesCount}}）</span>
          </li>
          <li v-for="cate of cateList" :key="cate.id" :class="currentCateId === cate.id ? 'active_cate_li' : ''" @click="chooseCate(1, cate)">
            <span>
              {{ cate.cateName + '(' + cate.articleCount + ')' }}
            </span>
          </li>
          <li>
            <span v-if="displayShowMoreCateBtn" @click="showMoreCate" class="show_more_cate_btn">展开更多<i class="el-icon-d-arrow-right"></i></span>
          </li>
        </ul>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-collapse-transition>
      <el-row class="child_cate_list" v-if="childCateList.length !== 0">
        <el-col>
          <ul>
            <li :class="currentChildCateId === 0 ? 'active_cate_li' : ''" @click="chooseCate(2)">
              <span>全部（{{ childCategoriesCount }}）</span>
            </li>
            <li v-for="cate of childCateList" :key="cate.id" :class="currentChildCateId === cate.id ? 'active_cate_li' : ''" @click="chooseCate(2, cate)">
              <span>
                {{ cate.cateName + '(' + cate.articleCount + ')' }}
              </span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-collapse-transition>
  </div>
</template>

<style scoped>
.classify_list_content {
  background: var(--topicTitleBg);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  padding: 5px 0;
}


.child_cate_list {
  border-top: 1px solid var(--borderColor);
  margin-top: 10px;
  padding-top: 10px;
}

.classify_list_content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.classify_list_content li {
  float: left;
  padding: 3px 5px;
  margin: 4px 10px;
  text-align: center;
}

.classify_list_content span {
  color: var(--aColor);
  font-size: 13px;
  text-decoration: none;
  transition: all 0.5s;
  cursor: pointer;
}

.classify_list_content li:not(.active_cate_li):hover span {
  color: var(--mainThemeColor);
}

.active_cate_li {
  background-color: var(--mainThemeColor);
  pointer-events:none;
}

.active_cate_li span {
  color: #FFF;
}
.show_more_cate_btn:hover {
  color: var(--mainThemeColor);
}
</style>
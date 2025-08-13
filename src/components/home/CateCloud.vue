<script setup lang="ts">
import {onMounted, ref} from "vue";
import {genData} from "../../utils/api-util.ts";
import {getAllCategory} from "../../api/categoryApi.ts";
import type {CategoryItem} from "../../types/CategoryItem.ts";
import {randomColor} from "../../utils/common-util.ts";
import {CateCloudItem} from "../../types/CateCloudItem.ts";

const cloudSvgConfig = {
  width: 300,
  height: 500,
  RADIUS: 200,
  speedX: Math.PI / 360,
  speedY: Math.PI / 360,
  CX: 150,
  CY: 250
}

const cateCloudList = ref<CateCloudItem[]>([])

onMounted(() => {
  initCateList()
  setInterval(() => {
    rotateX(cloudSvgConfig.speedX);
    rotateY(cloudSvgConfig.speedY);
  }, 17)
})

async function initCateList() {
  genCateCloud(await genData(getAllCategory()))
}

function genCateCloud(categories: CategoryItem[]) {
  let length = categories.length;
  let tags: CateCloudItem[] = [];
  for (let i = 0; i < length; i++) {
    let tag = new CateCloudItem(categories[i]);
    let k = -1 + (2 * (i + 1) - 1) / length;
    let a = Math.acos(k);
    let b = a * Math.sqrt(length * Math.PI);
    tag.x = cloudSvgConfig.CX + cloudSvgConfig.RADIUS * Math.sin(a) * Math.cos(b);
    tag.y = cloudSvgConfig.CY + cloudSvgConfig.RADIUS * Math.sin(a) * Math.sin(b);
    tag.z = cloudSvgConfig.RADIUS * Math.cos(a);
    tag.href = '#';
    tag.fill = randomColor();
    tags.push(tag);
  }
  cateCloudList.value = tags;
}
function rotateX(angleX: number) {
  let cos = Math.cos(angleX);
  let sin = Math.sin(angleX);
  for (let tag of cateCloudList.value) {
    let y1 = (tag.y - cloudSvgConfig.CY) * cos - tag.z * sin + cloudSvgConfig.CY;
    let z1 = tag.z * cos + (tag.y - cloudSvgConfig.CY) * sin;
    tag.y = y1;
    tag.z = z1;
  }
}
function rotateY(angleY: number) {
  let cos = Math.cos(angleY);
  let sin = Math.sin(angleY);
  for (let tag of cateCloudList.value) {
    let x1 = (tag.x - cloudSvgConfig.CX) * cos - tag.z * sin + cloudSvgConfig.CX;
    let z1 = tag.z * cos + (tag.x - cloudSvgConfig.CX) * sin;
    tag.x = x1;
    tag.z = z1;
  }
}

function listener(event: MouseEvent) {//响应鼠标移动
  let x = event.clientX - cloudSvgConfig.CX;
  let y = event.clientY - cloudSvgConfig.CY;
  cloudSvgConfig.speedX = x * 0.0001 > 0 ? Math.min(cloudSvgConfig.RADIUS * 0.00002, x * 0.0001) : Math.max(-cloudSvgConfig.RADIUS * 0.00002, x * 0.0001);
  cloudSvgConfig.speedY = y * 0.0001 > 0 ? Math.min(cloudSvgConfig.RADIUS * 0.00002, y * 0.0001) : Math.max(-cloudSvgConfig.RADIUS * 0.00002, y * 0.0001);
}
</script>

<template>
<div class="cate_cloud_content">
  <div class="cate_cloud_title">
    <span><i class="iconfont iconbiaoqian"></i>&nbsp;标签云</span>
    <el-link underline="never">共{{cateCloudList.length}}个</el-link>
  </div>
  <div class="cate_cloud_svg">
    <svg :height='cloudSvgConfig.height' @mousemove='listener($event)' v-if="cateCloudList.length !== 0">
      <router-link :to="{name: 'CateList', params: {id: tag.id}}" v-for='tag in cateCloudList' :key="tag.id">
        <text :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)' :fill="tag.fill">
          {{ tag.cateName }}
        </text>
      </router-link>
    </svg>
  </div>
</div>
</template>

<style scoped>
.cate_cloud_content {
  background-color: var(--bgColor);
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.cate_cloud_title {
  height: 50px;
  border-bottom: 1px solid var(--borderColor);
  font-size: 18px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}
.cate_cloud_title a {
  text-decoration: none;
}
.cate_cloud_svg {
  text-align: center;
}
svg {
  width: 94%;
}
</style>
<script setup lang="ts">
import {computed} from "vue";
import {useMainStore} from "../../stores/store.ts";

const store = useMainStore()
const footIconImg = 'http://file.zhangdx.cn/asserts/icon.svg'
const currentYear = new Date().getFullYear()
const sharedIcons = [
  {
    iconClass: "iconfont iconweixin1",
    title: "微信",
    type: "show",
    href: "/images/qrcode_for_gh_6e38291aed7a_258.jpg",
  },
  {
    iconClass: "iconfont icongithub-fill",
    title: "Github",
    type: "href",
    href: "https://github.com/ZDX3987",
  },
  {iconClass: "iconfont iconxinlangweibo", title: "微博", type: "href", href: ""},
  {
    iconClass: "iconfont iconyouxiang1",
    title: "反馈",
    type: "href",
    href: "mailto:zdx3987@163.com?&subject=ZHANGDX博客反馈邮件"
  },
]

const blogName = computed(() => {
  return store.blogName
})
</script>

<template>
<div class="foot_container">
  <el-row>
    <el-col :md="12">
      <div class="blog_foot_icon">
        <img :src="footIconImg" :alt="blogName">
      </div>
      <p class="copyright">
        <a href="http://beian.miit.gov.cn">豫 ICP 备 20019985 号 - 1</a>
        Copyright © {{ currentYear }}
        <a href="http://www.zhangdx.cn">{{blogName}}</a>
      </p>
    </el-col>
    <el-col :md="12">
      <div class="shared_icon">
        <ul>
          <li v-for="(iconItem, i) of sharedIcons" :key="i">
            <a :href="iconItem.type === 'show' ? '#' : iconItem.href" class="shared_a" :title="iconItem.title">
              <span :class="iconItem.iconClass" aria-hidden="true"></span>
              <el-image class="qrcode_img" v-if="iconItem.type === 'show'" :src="iconItem.href" fit="cover"></el-image>
            </a>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.foot_container {
  width: 100%;
  background-color: rgb(23, 28, 62);
  padding: 80px 0;
  text-align: center;
}
.blog_foot_icon {
  margin-bottom: 30px;
}
.copyright {
  color: rgb(176, 183, 189);
  font-size: 14px;
}
.shared_icon a {
  width: 50px;
  height: 50px;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
}
.shared_icon span {
  font-size: 24px;
  line-height: 50px;
}

.qrcode_img {
  width: 100px;
  height: 100px;
  transform: scale(0.5, 0.5);
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  left: -25px;
  top: -25px;
}

.shared_a:hover .qrcode_img {
  transform: scale(1, 1) translate(-100px, 0);
  opacity: 1;
}

/* 公共样式 */
ul {
  list-style: none;
  text-align: center;
  padding-left: 0;
}

ul li {
  display: inline;
  margin: 0 1%;
}

a {
  color: rgb(176, 183, 189);
  text-decoration: none;
  transition: all 0.5s;
}

a:hover {
  color: var(--mainThemeColor);
}
</style>
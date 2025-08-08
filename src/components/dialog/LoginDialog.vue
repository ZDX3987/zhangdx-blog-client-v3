<script setup lang="ts">
import {computed} from "vue";
import {useMainStore} from "../../stores/store.ts";
import {login} from "../../api/common.ts";
import {ElMessage} from "element-plus";

const store = useMainStore()
const showDialog = computed(() => {
  return store.showLoginDialog
})
const loginType = [
  {type: 'QQ', icon: 'iconfont iconQQ', color: 'rgb(94,164,210)', text: 'QQ'},
  {type: 'GITEE', icon: 'iconfont iconmayun', color: 'rgb(178,53,37)', text: '码云'},
  {type: 'GITHUB', icon: 'iconfont iconhuaban881', color: 'rgb(51,51,51)', text: 'Github'},
  {type: 'FEISHU', icon: 'iconfont iconiconfeishuLOGO', color: 'rgb(76,114,252)', text: '飞书'},
]

function launchLogin(type: string) {
  // 解决Safari无法打卡新窗口问题
  let newWindow: WindowProxy = window.open('', '_blank', "width=1000,height=600,menubar=yes,location=yes,resizable=yes,scrollbars=true,status=true");
  login(type, 'Login', -1).then(res => {
    newWindow.location = res.data
  }).catch(error => ElMessage.error(error))
}
function close() {
  store.toggleLoginDialog(false)
}
</script>

<template>
<el-dialog title="授权登录" v-model="showDialog" @close="close" center>
  <el-row type="flex" justify="center" class="dialog_body_row">
    <el-col v-for="type of loginType" :key="type.type" :xl="1" :md="2" :sm="4" :xs="5">
        <span class="login_type_item" :class="type.icon" :title="type.text" :style="{color:type.color}" @click="launchLogin(type.type)"></span>
    </el-col>
  </el-row>
  <template #footer>
    <p class="agreement_info">授权登录即表示同意获取用户信息注册本系统账号</p>
  </template>
</el-dialog>
</template>

<style scoped>
.dialog_body_row {
  padding-top: 20px;
}
.login_type_item {
  font-size: 30px;
}
.agreement_info {
  color: #8c939d;
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 14px;
}
</style>
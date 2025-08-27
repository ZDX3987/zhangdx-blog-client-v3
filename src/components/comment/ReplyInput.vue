<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";

const replyText = ref<string>('')
const emit = defineEmits(['save-reply', 'reply-blur'])
const replyInput = ref()

onMounted(() => {
  document.addEventListener('click', doReplyBlur);
  replyInput.value.focus()
})
onUnmounted(() => {
  document.removeEventListener('click', doReplyBlur)
})

function saveReply() {
  let text = replyText.value
  emit('save-reply', text)
  replyText.value = ''
  emit('reply-blur', '');
}

function doReplyBlur() {
  emit('reply-blur', '');
}

function replyClick() {
}
</script>

<template>
  <div class="reply_input_content" @click.stop="replyClick">
    <div>
      <textarea class="reply-input" ref="replyInput" placeholder="发表你的看法" rows="3" v-model="replyText"></textarea>
    </div>
    <div>
      <!--      <a class="fa fa-smile-o reply-emoji-btn d-inline-block" title="添加表情">&nbsp;表情</a>-->
      <el-button type="success" class="reply_input_btn" :disabled="!replyText" @click="saveReply">回复</el-button>
    </div>
  </div>
</template>

<style scoped>
.reply_input_content {
  display: inline-block;
  width: 100%;
  margin-top: 10px;
}
.reply-input {
  width: 100%;
  max-height: 100px;
  resize: none;
  background-color: var(--bgColor);
  transition: all 0.5s;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
  border: 1px solid var(--mainThemeColor);
  border-radius: 4px;
}

.reply-input:focus,
.reply-input:hover {
  border: 1px solid var(--mainThemeColor);
}
.reply_input_btn {
  display: inline-block;
  float: right;
}
.reply-emoji-btn {
  color: var(--subFontColor);
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
}

.reply-emoji-btn:hover {
  color: var(--mainThemeColor);
}
</style>
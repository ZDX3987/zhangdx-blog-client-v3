<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {useMainStore} from "../../stores/store.ts";
import type {CommentItem} from "../../types/CommentItem.ts";
import {fromNow} from "../../utils/moment-date.ts";
import {getAuthorization} from "../../utils/auth-storage.ts";
import {getCommentListForItem, doSaveComment, doDeleteComment} from "../../api/commentApi.ts";
import {ElMessage} from "element-plus";

const store = useMainStore();
const currentAuthUserInfo = computed(() => {
  return store.userInfo
})
const authed = computed(() => {
  return currentAuthUserInfo.value !== null
})
const props = defineProps({
  itemId: {type: String, default: ''},
  commentType: {type: Number, default: 0},
  authorUserId: {type: Number, default: 0},
})
const commentList = ref<CommentItem[]>([])
const currentCommentContent = ref<string>('')
const currentReplyId = ref<string>()
const maxShowReplyNum = 5
let loading = false

onMounted(() => {
  loadComment()
})

function loadComment() {
  loading = true
  getCommentListForItem(props.itemId, props.commentType).then(res => {
    commentList.value = res.data
    loading = false
  })
}

function saveComment() {
  if (!getAuthorization()) {
    return;
  }
  let itemId = props.itemId;
  let sysUserId: number = currentAuthUserInfo.value?.id;
  let commentType = props.commentType;
  doSaveComment(itemId, currentCommentContent.value, commentType, sysUserId).then(() => {
    ElMessage.success('评论成功')
  })
}

function deleteComment(commentId: number) {
  doDeleteComment(commentId).then(() => ElMessage.success('评论已删除'))
}

function checkForComment() {
  if (!getAuthorization()) {
    store.toggleLoginDialog(true)
  }
}

function openReply(replyId: string) {
  if (!getAuthorization()) {
    store.toggleLoginDialog(true)
    return
  }
  if (currentReplyId.value === replyId) {
    currentReplyId.value = ''
    return;
  }
  currentReplyId.value = replyId
}

function parseComment(type: number, commentId: number) {

}
</script>

<template>
  <div class="comment_content">
    <div class="comment_content_header">
      <span><i class="fa fa-commenting"></i>&nbsp;发表评论</span>
    </div>
    <div class="comment_content_body">
      <el-row>
        <el-col :xl="1" :sm="2" :xs="4">
          <el-avatar icon="el-icon-user-solid" :src="currentAuthUserInfo?.avatar"/>
        </el-col>
        <el-col :xl="23" :sm="22" :xs="20">
          <textarea class="comment_input" placeholder="发表你的看法" rows="3" v-model="currentCommentContent"
                    :readonly="!authed" @focus="checkForComment"></textarea>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="{offset:1, span:4}" :sm="{offset:2, span:4}" :xs="{offset:4, span:4}">
          <el-popover
              placement="bottom"
              width="360"
              trigger="click">
            <!--            <picker @select="selectEmoji"></picker>-->
            <a slot="reference" class="fa fa-smile-o comment_emoji_btn" title="添加表情"></a>
          </el-popover>
        </el-col>
        <el-col :xl="{offset:15, span:4}" :sm="{offset:14, span:4}" :xs="{offset:12, span:4}">
          <el-button type="success" class="comment_btn" @click="saveComment"
                     :disabled="!currentCommentContent">发表评论
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="comment_list" v-if="commentList.length > 0" v-loading="loading">
      <h3 class="comment_list_title">全部评论 {{ commentList.length }}</h3>
      <div class="comment_item" v-for="commentItem in commentList" :key="commentItem.id">
        <div class="comment_item_avatar">
          <el-avatar icon="el-icon-user-solid" :src="commentItem.fromUser.avatar"/>
        </div>
        <div class="comment_item_right">
          <div>
            <span class="comment_user_name">{{ commentItem.fromUser.nickname }}
                <el-tag v-if="authorUserId === commentItem.fromUser.id" class="ml-2" type="success" size="small">作者</el-tag>
            </span>
            <span class="comment_date">{{ fromNow(commentItem.createDateTime) }}</span>
          </div>
          <div class="comment_text">
            {{ commentItem.content }}
          </div>
          <div>
            <el-link underline="never" @click.stop="parseComment(1, commentItem.id)" class="comment_item_btn">
              <i class="iconfont iconzan" aria-hidden="true"/>&nbsp;点赞
            </el-link>
            <el-link underline="never" @click.stop="openReply('comment_' + commentItem.id)" class="comment_item_btn">
              <i class="iconfont iconpinglun" aria-hidden="true"/>&nbsp;
              {{ currentReplyId === 'comment_' + commentItem.id ? '取消' : '' }}回复
            </el-link>
            <el-link v-if="commentItem.fromUser.id === currentAuthUserInfo?.userId" underline="never"
                     @click.stop="deleteComment(commentItem.id)">
              <i class="el-icon-delete" aria-hidden="true"/>&nbsp;删除
            </el-link>
          </div>
<!--          <reply-input v-if="currentReplyId === 'comment_' + commentItem.id" @reply-blur="replyBlur"-->
<!--                       @save-reply="saveReply($event, commentItem.id, commentItem.id, 1, currentAuthUserInfo?.userId, commentItem.fromUser.id)"/>-->
          <div class="comment_reply_list" v-if="commentItem.replyList.length > 0">
            <div class="comment_reply_item" v-for="(replyItem, index) in commentItem.replyList"
                 :key="replyItem.id">
              <div class="comment_reply_item_avatar">
                <el-avatar class="comment_reply_avatar" icon="el-icon-user-solid" :src="replyItem.fromUser.avatar"/>
              </div>
              <div class="comment_reply_item_right">
                <div>
                  <span class="comment_user_name">{{ replyItem.fromUser.nickname }}
                    <el-tag v-if="authorUserId === commentItem.fromUser.id" class="ml-2" type="success" size="small">作者</el-tag>
                  </span>
                  <span class="comment_user_name" v-if="replyItem.replyType === 2">{{ '回复&nbsp;' + replyItem.toUser.nickname }}
                    <el-tag v-if="authorUserId === commentItem.toUser.id" class="ml-2" type="success" size="small">作者</el-tag>
                  </span>
                  <span class="float-right comment_date">{{ fromNow(replyItem.createDateTime) }}</span>
                </div>
                <div class="comment_text">
                  {{ replyItem.content }}
                </div>
                <div>
                  <el-link underline="never" @click.stop="parseComment(2,commentItem.id)" class="comment_item_btn"><i
                      class="iconfont iconzan" aria-hidden="true"/>&nbsp;点赞
                  </el-link>
                  <el-link underline="never" @click.stop="openReply('reply_' + replyItem.id)" class="comment_item_btn">
                    <i class="iconfont iconpinglun"
                       aria-hidden="true"/>&nbsp;{{ currentReplyId === 'reply_' + replyItem.id ? '取消' : '' }}回复
                  </el-link>
                  <el-link v-if="replyItem.fromUser.id === currentAuthUserInfo?.userId" underline="never"
                           @click.stop="deleteReply(replyItem.id)">
                    <i class="el-icon-delete" aria-hidden="true"/>
                    删除
                  </el-link>
                </div>
                <!--                <reply-input ref="replyInput" v-if="currentReplyId === 'reply_' + replyItem.id" @reply-blur="replyBlur"-->
                <!--                             @save-reply="saveReply($event, commentItem.id, replyItem.id, 2, currentAuthUserInfo?.userId, replyItem.fromUser.id)"/>-->
              </div>
            </div>
            <el-link v-if="commentItem.replyList && commentItem.replyList.length > maxShowReplyNum" underline="never"
                     class="ml-5 mt-2" @click="showMoreReply">查看更多回复<span class="el-icon-arrow-down"></span>
            </el-link>
          </div>
        </div>
      </div>
      <div class="comment_load_btn ml-5 my-2">加载全部评论&nbsp;<span class="el-icon-arrow-down"></span></div>
    </div>
  </div>
</template>

<style scoped>
.comment_content {
  margin-top: 20px;
  background-color: var(--bgColor);
  text-align: left;
}

.comment_content_header {
  height: 50px;
  border-bottom: 1px solid var(--borderColor);
  font-size: 18px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}

.comment_input {
  width: 100%;
  max-height: 100px;
  resize: none;
  background-color: var(--bodyBgColor);
  transition: all 0.5s;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
  border: 1px solid var(--bodyBgColor);
  border-radius: 4px;
}

.comment_input:focus,
.comment_input:hover {
  border: 1px solid var(--mainThemeColor);
}

.comment_emoji_btn {
  color: var(--subFontColor);
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
}

.comment_emoji_btn:hover {
  color: var(--mainThemeColor);
}

.comment_content_body {
  padding: 30px;
}

.comment_btn {
  display: inline-block;
  float: right;
}

.comment_item_avatar {
  display: inline-block;
  margin-right: 10px;
}

.comment_reply_avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.comment_list {
  padding: 10px 30px 10px 30px;
}

.comment_list_title {
  font-weight: 600;
  color: var(--fontColor);
  margin-top: 20px;
}

.comment_item {
  display: flex;
  margin: 30px 0;
}

.comment_item_right {
  display: inline-block;
  width: 100%;
}

.comment_text {
  color: var(--fontColor);
  font-size: 14px;
  margin: 10px 0;
}

.comment_item_btn {
  margin-right: 10px;
}

.comment_user_name {
  color: var(--subFontColor);
  font-size: 15px;
}

.comment_date {
  color: var(--subFontColor);
  font-size: 14px;
  float: right;
}

.comment_reply_list {
  padding: 20px;
}
.comment_reply_item {
  display: flex;
  margin: 10px 0 10px 0;
}
.comment_reply_item_avatar {
  display: inline-block;
  margin-right: 10px;
}
.comment_reply_item_right {
  display: inline-block;
  width: 100%;
}
.comment_load_btn {
  height: 50px;
  line-height: 50px;
  background-color: var(--bodyBgColor);
  text-align: center;
  font-size: 15px;
}
</style>
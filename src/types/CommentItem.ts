import type {UserInfo} from "./UserInfo.ts";
import {ReplyItem} from "./ReplyItem.ts";

export class CommentItem {
    id: number;
    content: string;
    fromUser: UserInfo;
    toUser: UserInfo;
    createDateTime: Date;
    replyList: ReplyItem[];
}
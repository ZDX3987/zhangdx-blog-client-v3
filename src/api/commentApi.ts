import axios, {type ApiResponse} from "./axios.ts";
import {genApiResponse} from "../utils/api-util.ts";
import type {CommentItem} from "../types/CommentItem.ts";

const url = '/api/client/comment';

export function getCommentListForItem(itemId: string, commentType: number): Promise<ApiResponse<CommentItem[]>> {
    let params = {
        itemId,
        commentType,
    }
    return genApiResponse(axios.get(url, {params: params}))
}

export function doSaveComment(itemId: string, content: string, commentType: number, fromUser: number): Promise<ApiResponse<any>> {
    let params = {
        itemId,
        content,
        commentType,
        fromUser
    }
    return genApiResponse(axios.post(url, params));
}

export function doDeleteComment(commentId: number): Promise<ApiResponse<any>> {
    return genApiResponse(axios.delete(url + '/' + commentId))
}
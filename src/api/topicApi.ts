import axios, {type ApiResponse} from "./axios.ts";
import {genApiResponse} from "../utils/api-util.ts";
import type {ResultPage} from "../types/ResultPage.ts";
import type {TopicItem} from "../types/TopicItem.ts";

const url = '/api/client/topic';

export function getSimpleTopic(currentPage: number, pageSize: number, sort?: string) {
    if (sort === undefined) {
        sort = 'create_date'
    }
    let formData = {
        pageIndex: currentPage,
        pageSize,
        sort
    }
    return genApiResponse(axios.get(url + '/simple-topics', {params: formData}))
}


export function getTopicByPage(currentPage: number, pageSize: number): Promise<ApiResponse<ResultPage<TopicItem>>> {
    let params = {
        current: currentPage,
        pageSize: pageSize,
        sort: 'create_date'
    }
    return genApiResponse(axios.get(url + '/pages', {params: params}));
}
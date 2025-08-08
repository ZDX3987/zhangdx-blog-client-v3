import axios, {type ApiResponse} from "./axios.ts";
import type {ArticleItem} from "../types/ArticleItem.ts";
import {ResultPage} from "../types/ResultPage.ts";

const url = '/api/client/article';

export function getArticleByPage(pageSize: number, queryPage: number, sort: number, queryCateIds: number[], queryType: number = 1): Promise<ApiResponse<ResultPage<ArticleItem>>> {
    let formData = {
        pageSize: pageSize,
        pageIndex: queryPage,
        sortType: sort,
        cateIds: queryCateIds ? queryCateIds.join(',') : null,
        queryType: queryType,
        status: [],
        authorId: null
    }
    return axios.get(url + '/articles', {params: formData})
}
import axios, {type ApiResponse} from "./axios.ts";
import type {ArticleItem} from "../types/ArticleItem.ts";
import {ResultPage} from "../types/ResultPage.ts";
import {genApiResponse} from "../utils/api-util.ts";
import type {ArchivesTimeline} from "../types/ArchivesTimeline.ts";

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
    return genApiResponse(axios.get<ApiResponse<ResultPage<ArticleItem>>>(url + '/articles', {params: formData}))
}

export function getArticleById(articleId: string): Promise<ApiResponse<ArticleItem>> {
    return genApiResponse(axios.get(url + '/article/' + articleId))
}

export function getPrevAndNextArticle(articleId: string): Promise<ApiResponse<ArticleItem[]>> {
    return genApiResponse(axios.get(url + '/prev-next-article/' + articleId))
}

export function getRelatedArticles(articleId: string): Promise<ApiResponse<ArticleItem[]>> {
    return genApiResponse(axios.get(url + '/related-articles/' + articleId))
}

export function getArchivesTimeline(): Promise<ApiResponse<ArchivesTimeline[]>> {
    return genApiResponse(axios.get(url + '/archives/timeline'));
}

export function getArticleForArchives(queryDateStr: string, currentPage: number, pageSize?: number, queryStatus?: number, sort?: string): Promise<ApiResponse<ResultPage<ArticleItem>>> {
    let formData = {
        queryDateStr: queryDateStr,
        pageSize: pageSize || 15,
        currentPage: currentPage,
        articleStatus: queryStatus || 2,
        sort: sort || 'DESC',
    }
    return genApiResponse(axios.get(url + '/archives/page-article', {params: formData}))
}
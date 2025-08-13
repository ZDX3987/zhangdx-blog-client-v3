import axios, {type ApiResponse} from './axios.ts'
import {genApiResponse} from "../utils/api-util.ts";
import type {CategoryItem} from "../types/CategoryItem.ts";
import type {ResultPage} from "../types/ResultPage.ts";

const url = '/api/client/category';

export function getAllCategory(queryStatus?: number): Promise<ApiResponse<CategoryItem[]>> {
    if (queryStatus === undefined) {
        queryStatus = 1
    }
    let params = {
        queryStatus: queryStatus
    }
    return genApiResponse(axios.get(url + '/categories', {params: params}))
}

export function getCategoryPage(pageSize: number, currentPage: number, queryLevel: number, queryParentId?: number): Promise<ApiResponse<ResultPage<CategoryItem>>> {
    let formData = {
        pageSize: pageSize,
        current: currentPage,
        queryLevel: queryLevel,
        queryParentId: queryParentId
    };
    return genApiResponse(axios.get(url + '/categories-page', {params: formData}));
}
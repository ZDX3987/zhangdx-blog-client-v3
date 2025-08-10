import axios, {type ApiResponse} from './axios.ts'
import {genApiResponse} from "../utils/api-util.ts";
import type {CategoryItem} from "../types/CategoryItem.ts";

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
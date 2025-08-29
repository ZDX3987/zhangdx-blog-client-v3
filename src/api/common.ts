import axios, {type ApiResponse} from './axios.ts'
import type {MenuItem} from "../types/MenuItem.ts";
import {getAuthorization} from "../utils/auth-storage.ts";
import {genApiResponse} from "../utils/api-util.ts";
import type {ResultPage} from "../types/ResultPage.ts";
import {UpdateLog} from "../types/UpdateLog.ts";

export function getMenuList(): Promise<ApiResponse<MenuItem[]>> {
    return genApiResponse(axios.get<ApiResponse<MenuItem[]>>('/api/client/menu/list'))
}

export function logout(): Promise<ApiResponse<void>> {
    return axios.get('/api/logout', {
        headers: {
            'Authorization': getAuthorization()
        }
    })
}

export function login(type: string, method: string, sysUserId: number): Promise<ApiResponse<void>> {
    let params = {
        method: method,
        sysUserId: sysUserId
    }
    return axios.get('/api/client/oauth/login/' + type, {params: params});
}

export function praise(itemId: number, operatorId: number, likeType: 1 | 2) {
    let params = {
        itemId,
        operatorId,
        likeType
    };
    return genApiResponse(axios.post('/api/blog_like', params))
}

export function unPraise(itemId: number, operatorId: number, likeType: 1 | 2) {
    let params = {
        itemId,
        operatorId,
        likeType
    };
    return genApiResponse(axios.post('/api/blog_like/del', params))
}
export function getContentByRouter(route: string, value: string): Promise<ApiResponse<any>> {
    let params = {
        route: route,
        documentId: value
    };
    return genApiResponse(axios.get( '/api/client/content/list-by-router', {params: params}));
}

export function getUpdateLogByPage(pageSize: number, currentPage: number, status: number[]): Promise<ApiResponse<ResultPage<UpdateLog>>> {
    let formData = {
        pageSize: pageSize,
        currentPage: currentPage,
        status: status.toString()
    };
    return genApiResponse(axios.get('/api/client/update_log/page', {params: formData}));
}
import axios, {type ApiResponse} from './axios.ts'
import type {MenuItem} from "../types/MenuItem.ts";
import {getAuthorization} from "../utils/auth-storage.ts";
import {genApiResponse} from "../utils/api-util.ts";

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

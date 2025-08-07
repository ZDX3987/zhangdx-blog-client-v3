import axios, {type ApiResponse} from './axios.ts'
import type {MenuItem} from "../types/MenuItem.ts";
import {getAuthorization} from "../utils/auth-storage.ts";

export function getMenuList(): Promise<ApiResponse<MenuItem[]>> {
    return axios.get('/api/client/menu/list')
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

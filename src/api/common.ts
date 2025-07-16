import axios, {type ApiResponse} from './axios.ts'
import type {MenuItem} from "../types/MenuItem.ts";

export function getMenuList(): Promise<ApiResponse<MenuItem[]>> {
    return axios.get('/api/client/menu/list')
}
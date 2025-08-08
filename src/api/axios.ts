import axios, {type AxiosResponse} from 'axios'
import {getAuthorization, setAuthorization} from "../utils/auth-storage.ts";
import {ElMessage, ElNotification} from 'element-plus'
import Router from '../router/index.ts'

const service = axios.create({
    baseURL: '',
    timeout: 15000
})

// 请求计数器
let requestNum = 0;
let notification: any = null;
service.interceptors.request.use(request => {
    const token = getAuthorization()
    token && (request.headers.Authorization = token)
    requestNum++
    return request
}, error => {
        requestNum = 0;
        return Promise.reject(error);
})

service.interceptors.response.use(response => {
    requestNum--;
    let data: ApiResponse<any> = response.data;
    processCommonResponseCode(data)
    storageToken(response)
    if (data.code !== 200) {
        return Promise.reject(data.msg)
    }
    return data
}, error => {
    if (notification && requestNum <= 0) {
        // notification.closeAll();
    }
    let resp = error.response;
    errorHandle(resp);
    requestNum = 0;
    return Promise.reject(error);
})

export interface ApiResponse<T> {
    code: number,
    msg: string,
    data: T
}

function processCommonResponseCode(responseData: ApiResponse<any>) {
    const code = responseData.code;
    switch (code) {
        case 404:
            ElMessage.error(responseData.msg)
            Router.push('/error');
            break;
        default:
            break;
    }
}

function storageToken(response: AxiosResponse<any>) {
    if (response.config.url === '/api/login') {
        let token = response.headers.authorization;
        if (token) {
            setAuthorization(token)
        }
    }
}

function errorHandle(response: AxiosResponse<any>) {
    let status = response.status;
    if (status === 500) {
        return;
    }
    notification = ElNotification.error({
        title: '错误（' + status + ')',
        message: '服务器出现错误，请稍后重试！',
        showClose: false
    });
    setInterval(() => {
        ElMessage.closeAll();
    }, 10);
    switch (status) {
        case 401:
            Router.push('/');
            break;
        default:
            Router.push('/error');
            break;
    }
}

export default service
import axios from "./axios.ts";
import {genApiResponse} from "../utils/api-util.ts";

export function getSimpleTopic(currentPage: number, pageSize: number, sort?: string) {
    if (sort === undefined) {
        sort = 'create_date'
    }
    let formData = {
        pageIndex: currentPage,
        pageSize,
        sort
    }
    return genApiResponse(axios.get('/api/client/topic/simple-topics', {params: formData}))
}
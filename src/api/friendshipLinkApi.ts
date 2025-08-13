import axios from "./axios.ts";
import type {FriendshipLink} from "../types/FriendshipLink.ts";
import {genApiResponse} from "../utils/api-util.ts";

const url = '/api/client/friendship-link';

export function getAllFriendshipLink() {
    return genApiResponse(axios.get(url + '/friendship-links'));
}

export function saveLink(form: FriendshipLink) {
    return axios.post(url, form, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
}
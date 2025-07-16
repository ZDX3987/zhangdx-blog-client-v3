import {getStorageItem, removeStorageItem, setStorageItem} from "./local-storage.ts";

const authorization: string = 'Authorization'

export function getAuthorization() {
    return getStorageItem(authorization);
}
export function setAuthorization(value: string) {
    setStorageItem(authorization, value);
}

export function removeAuthorization() {
    removeStorageItem(authorization);
}
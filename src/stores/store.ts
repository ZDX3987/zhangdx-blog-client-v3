import {defineStore} from "pinia";
import type {UserInfo} from "../types/UserInfo.ts";
import {ThemeEnum} from "../types/ThemeEnum.ts";

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        mobileMenuShowed: false as boolean,
        // 登录用户信息
        userInfo: null as UserInfo | null,
        theme: ThemeEnum.LIGHT as ThemeEnum,
        showLoginDialog: false as boolean,
        showSearchBar: false as boolean
    }),
    actions: {
        showMobileMenu(showed: boolean) {
            this.mobileMenuShowed = showed
        },
        toggleTheme(theme: ThemeEnum) {
            this.theme = theme
            document.head.querySelector('#theme').setAttribute('href',
                `/css/theme/${theme}.css`)
        },
        updateUserInfo(userInfo: UserInfo | null) {
            this.userInfo = userInfo
        },
        toggleLoginDialog(show: boolean) {
            this.showLoginDialog = show
        },
        toggleShowSearchBar(show: boolean) {
            this.showSearchBar = show
        }
    }
})
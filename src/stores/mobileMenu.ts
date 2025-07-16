import {defineStore} from "pinia";

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        mobileMenuShowed: false as Boolean,
    }),
    actions: {
        showMobileMenu(showed: Boolean) {
            this.mobileMenuShowed = showed
        }
    }
})
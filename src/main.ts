import { createApp } from 'vue'
import './style.css'
import './assets/styles/element-variables.scss'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/display.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import './assets/styles/bootstrap-utilities.scss'

const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')

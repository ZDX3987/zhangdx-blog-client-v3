import { createApp } from 'vue'
import './style.css'
import './assets/styles/element-variables.scss'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/display.css'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";

const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')

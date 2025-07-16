import { createApp } from 'vue'
import './style.css'
import './assets/styles/element-variables.scss'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/display.css'
import App from './App.vue'
import index from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(index)
app.mount('#app')

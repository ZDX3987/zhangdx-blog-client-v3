import { createApp } from 'vue'
// import './style.css'
import './assets/styles/element-variables.scss'
import ElementPlus from 'element-plus'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')

import {createMemoryHistory, createRouter} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {title: '首页'}
    }
]

const index = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default index
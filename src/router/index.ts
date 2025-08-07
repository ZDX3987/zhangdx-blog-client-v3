import {createMemoryHistory, createRouter} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {title: '首页'}
    },
    {
        path: '/article/:articleId.html',
        name: 'ArticleDetail',
        component: () => import('../views/ArticleDetail.vue'),
        meta: {title: '文章详情'}
    }
]

const index = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default index
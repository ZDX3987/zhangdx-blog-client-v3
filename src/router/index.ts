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
    },
    {
        path: '/cate/:id.html',
        name: 'CateList',
        component: () => import('../views/CateList.vue'),
        meta: {
            title: '分类标签'
        }
    },{
        path: '/topic',
        name: 'TopicList',
        component: () => import('../views/TopicList.vue'),
        meta: {
            title: '专题'
        },
        children: [
            {
                path: ':id.html',
                name: 'TopicDetail',
                component: () => import('../views/TopicDetail.vue'),
                meta: {
                    title: '专题详情'
                }
            },
        ]

    },
    {
        path: '/friendship-link',
        name: 'FriendshipLink',
        component: () => import('../views/FriendshipLink.vue'),
        meta: {
            title: '友情链接'
        }
    }

]

const index = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default index
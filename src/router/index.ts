import {createRouter, createWebHistory} from "vue-router";
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
        path: '/classify',
        name: 'Classify',
        component: () => import('../views/Classify.vue'),
        meta: {
            title: '文章分类'
        }
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
        path: '/archives',
        name: 'Archives',
        component: () => import('../views/Archives.vue'),
        meta: {
            title: '归档'
        }
    },
    {
        path: '/updatelog',
        name: 'UpdateLog',
        component: () => import('../views/UpdateLog.vue'),
        meta: {
            title: '更新日志'
        }
    },
    {
        path: '/friendship-link',
        name: 'FriendshipLink',
        component: () => import('../views/FriendshipLink.vue'),
        meta: {
            title: '友情链接'
        }
    },
    {
        path: '/content/:pathMatch',
        name: 'BlogContent',
        component: () => import('../views/BlogContent.vue'),
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
})

router.afterEach((route, to, from) => {
    if (route.meta.title !== undefined) {
        document.title = route.meta.title + ' - ZHANGDX的博客'
    } else {
        document.title = 'ZHANGDX的博客'
    }
})

export default router
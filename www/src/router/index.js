import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/home'
    },
    {
        name: 'user',
        path: '/user',
        component: () => import('../view/user'),
        meta: {
            title: '会员中心'
        }
    },
    {
        name: 'cart',
        path: '/cart',
        component: () => import('../view/cart'),
        meta: {
            title: '购物车'
        }
    },
    {
        name: 'home1',
        path: '/home1',
        component: () => import('../view/home/home'),
        meta: {
            title: '综合显示'
        }
    },
    {
        name: 'home',
        redirect: '/home',
        component: () => import('../layout/BasicLayout'),
        children: [
            {
                name: 'home',
                path: '/home',
                component: () => import('../view/home/home'),
                meta: {
                    title: '综合显示'
                }
            }
        ]
    }
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({routes});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};
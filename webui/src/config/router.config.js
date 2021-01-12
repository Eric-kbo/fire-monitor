// eslint-disable-next-line
import {UserLayout, BasicLayout, BlankLayout} from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}

export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: { title: 'menu.home' },
        redirect: '/dashboard/workplace',
        children: [
            // dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/workplace',
                component: RouteView,
                meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
                children: [
                    {
                        path: '/dashboard/workplace',
                        name: 'Workplace',
                        component: () => import('@/views/dashboard/Workplace'),
                        meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
                    },
                    {
                        path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
                        name: 'Analysis',
                        component: () => import('@/views/dashboard/Analysis'),
                        meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
                    }
                ]
            },
            {
                path: '/home',
                name: 'index',
                redirect: '/home/home',
                component: RouteView,
                meta: { title: 'menu.home', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
                children: [
                    {
                        path: '/home/home',
                        name: 'home',
                        component: () => import('@/views/home/home'),
                        meta: { title: 'menu.home', keepAlive: true, permission: ['dashboard'] }
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
            },
            {
                path: 'recover',
                name: 'recover',
                component: undefined
            }
        ]
    },

    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    }
]

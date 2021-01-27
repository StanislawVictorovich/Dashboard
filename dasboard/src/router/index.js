import Vue from 'vue'
import VueRouter from 'vue-router'
import { ALL_USERS } from '../constants'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: `/users/${ALL_USERS}`
    },
    {
        path: '/users/:id',
        name: 'Users',
        component: () => import(/* webpackChunkName: "board" */ '../views/Board.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

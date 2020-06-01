import Home from '@/views/Home.vue'
import Stocks from '@/views/Stocks.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Stocks',
        name: 'Stocks',
        component: Stocks
    }
];

const router = new VueRouter({
    routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import vHome from '@/components/v-home'
import vCatalog from '@/components/catalog/v-catalog'
import vCart from '@/components/cart/v-cart'

const routes = [{
        path: '/home',
        name: 'home',
        component: vHome
    },
    {
        path: '/',
        name: 'catalog',
        component: vCatalog,

    },

    {
        path: '/cart',
        name: 'cart',
        component: vCart,
        props: true
    }
]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})







export default router;
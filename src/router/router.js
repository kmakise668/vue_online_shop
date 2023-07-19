import { createRouter, createWebHistory } from 'vue-router'
import vHome from '@/components/v-home'
import vCatalog from '@/components/catalog/v-catalog'
import vCart from '@/components/cart/v-cart'
import vDashboard from '@/components/v-dashboard'
import vLogin from '@/components/login/v-login'
import vRegister from '@/components/register/v-register'
import vProductSingle from '@/components/product/v-product-single'

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
        path: '/catalog/:slug/:id',
        name: 'product-single',
        component: vProductSingle,
        props: true, // Включает передачу параметров как props в компонент
    },
    {
        path: '/cart',
        name: 'cart',
        component: vCart,
        props: true
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: vDashboard
    },
    {
        path: '/login',
        name: 'login',
        component: vLogin
    },
    {
        path: '/register',
        name: 'register',
        component: vRegister
    }
]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})







export default router;
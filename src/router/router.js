import { createRouter, createWebHistory } from 'vue-router'
import vHome from '@/components/v-home'
import vCatalog from '@/components/catalog/v-catalog'
import vCart from '@/components/cart/v-cart'
import vDashboard from '@/components/v-dashboard'
import vLogin from '@/components/login/v-login'
import vRegister from '@/components/register/v-register'
import vProductSingle from '@/components/product/v-product-single'

const routes = [{
        path: '/',
        name: 'home',
        component: vHome,
        meta: { breadcrumb: 'Главная страница' },
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: vCatalog,
        meta: { breadcrumb: 'Catalog' },
    },
    {
        path: '/catalog/:slug/:id',
        name: 'product-single',
        component: vProductSingle,
        props: true,
        meta: {
            breadcrumb: route => {
                return route.params.slug;
            },
        },
    },
    {
        path: '/cart',
        name: 'cart',
        component: vCart,
        props: true,
        meta: { breadcrumb: 'Cart' },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: vDashboard,
        meta: { breadcrumb: 'Dashboard' },
    },
    {
        path: '/login',
        name: 'login',
        component: vLogin,
        meta: { breadcrumb: 'Login' },
    },
    {
        path: '/register',
        name: 'register',
        component: vRegister,
        meta: { breadcrumb: 'Register' },
    }
]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})







export default router;
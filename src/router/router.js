import { createRouter, createWebHistory } from 'vue-router'
import store from '@/vuex/store';
import vHome from '@/components/v-home'
import vCatalog from '@/components/catalog/v-catalog'
import vCart from '@/components/cart/v-cart'
// import vDashboard from '@/components/dashboard/v-dashboard'
import vLogin from '@/components/login/v-login'
import vRegister from '@/components/register/v-register'
import vProductSingle from '@/components/product/v-product-single'
import vOrder from '@/components/order/v-order'
import NotFound from '@/components/error-page/404'


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
        path: '/admin',
        name: 'Admin',

        component: () =>
            import ('@/components/dashboard/v-dashboard'),
        beforeEnter: (to, from, next) => {
            if (store.state.isAuthenticated && store.state.role === 1) {
                next();
            } else {
                next('/login');
            }
        },



    },
    {
        path: '/dashboard',
        name: 'Dashboard',

        component: () =>
            import ('@/components/v-home'),
        beforeEnter: (to, from, next) => {
            if (store.state.isAuthenticated && store.state.role !== 1) {
                next();
            } else {
                next('/login');
            }
        },
    },

    {
        path: '/login',
        name: 'login',
        component: vLogin,
        meta: { breadcrumb: 'Login' },
        beforeEnter: (to, from, next) => {
            if (store.state.isAuthenticated) {
                // Если пользователь авторизован, перенаправляем в личный кабинет
                if (store.state.role === 1) {
                    next('/admin');
                } else {
                    next('/dashboard');
                }
            } else {
                // Если пользователь не авторизован, позволяем доступ к странице входа
                next();
            }
        }
    },
    {
        path: '/register',
        name: 'register',
        component: vRegister,
        meta: { breadcrumb: 'Register' },
        beforeEnter: (to, from, next) => {
            if (store.state.isAuthenticated) {
                // Если пользователь авторизован, перенаправляем в личный кабинет
                if (store.state.role === 1) {
                    next('/admin');
                } else {
                    next('/dashboard');
                }
            } else {
                // Если пользователь не авторизован, позволяем доступ к странице входа
                next();
            }
        }
    },
    {
        path: '/order',
        name: 'order',
        component: vOrder,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
        meta: { skipAuthCheck: true }
    }
    // { path: '/:pathMatch(.*)*', component: NotFound },
]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})




export default router;
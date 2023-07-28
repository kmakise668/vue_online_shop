import { createRouter, createWebHistory } from 'vue-router'
// import store from '@/vuex/store';
import vHome from '@/components/v-home'
import vCatalog from '@/components/catalog/v-catalog'
import vCart from '@/components/cart/v-cart'
import vDashboard from '@/components/dashboard/v-dashboard'
import vLogin from '@/components/login/v-login'
import vRegister from '@/components/register/v-register'
import vProductSingle from '@/components/product/v-product-single'
import vOrder from '@/components/order/v-order'


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
        path: '/admin/dashboard',
        name: 'dashboard',
        component: vDashboard,
        meta: { requiresAdmin: true },
    },
    // {
    //     path: '/user/dashboard',
    //     name: 'UserDashboard',
    //     component: UserDashboard,
    //     meta: { requiresAuth: true }, // Маркер для админских защищенных маршрутов
    //   },
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
    },
    {
        path: '/order',
        name: 'order',
        component: vOrder,
    },
    // { path: '/:pathMatch(.*)*', component: NotFound },
]

// import axios from 'axios';

// // Функция для получения текущего пользователя
// async function getCurrentUser() {
//     try {
//         // Выполняем GET-запрос к API для получения информации о текущем пользователе
//         const response = await axios.get('http://localhost:8888/api/users');

//         // Возвращаем информацию о текущем пользователе из ответа сервера
//         return response.data;
//     } catch (error) {
//         // Если возникла ошибка, например, если пользователь не авторизован, возвращаем null
//         return null;
//     }
// }

// export { getCurrentUser };
// // Ваш файл маршрутизации (router.js) - продолжение

// import { getCurrentUser } from './api/auth'; // Предположим, что у вас есть функция для получения текущего пользователя

// router.beforeEach(async(to, from, next) => {
//     const currentUser = await getCurrentUser(); // Предположим, что getCurrentUser() возвращает информацию о текущем пользователе

//     if (to.meta.requiresAuth && !currentUser) {
//         // Если маршрут требует авторизации и пользователь не авторизован, перенаправить на страницу входа
//         next({ name: 'Login' });
//     } else if (to.meta.requiresAdmin && (!currentUser || !currentUser.isAdmin)) {
//         // Если маршрут требует прав администратора и пользователь не администратор или не авторизован, перенаправить на страницу без доступа
//         next({ name: 'AccessDenied' });
//     } else {
//         // Все проверки пройдены, перейти на запрошенную страницу
//         next();
//     }
// });




const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})







export default router;
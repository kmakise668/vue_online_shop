<template>
<header class="fixed  inset-x-0 top-0 z-50" :class="{ 'shadow-sm bg-blue-50': scrolled }">
    <nav class="flex items-center justify-between p-6  mx-auto max-w-2xl   lg:max-w-7xl  lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
            <router-link to="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </router-link>
        </div>
        <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
                <span class="sr-only">Open main menu</span>
                <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
            <router-link v-for="item in navigation" :key="item.name" :to="item.href" class="text-md transition font-normal leading-6 text-gray-900 hover:text-blue-500 ">{{ item.name }}</router-link>
        </div>

        <div class="hidden relative lg:flex lg:flex-1 lg:justify-end">
            <router-link :to="{ name: 'cart' }">
                <ShoppingCartIcon class="transition transition-delay-300 w-8 h-8 scale-1 transform hover:scale-90" />
                <div class="v-catalog__link_to_cart  text-xs absolute z-index-10 w-5 h-5 flex items-center justify-center  rounded-full top-[-6px] right-[-6px] bg-blue-500 shadow-md font-bold  text-white"> {{ CART.length }}</div>
            </router-link>
        </div>
        <div v-if="user">
        <p v-if="user.name">Привет, {{ user.name }}</p>
        </div>
        {{ isAuthenticated }}
        {{ role }}

        <Menu as="div" class="relative ml-3" v-if="isAuthenticated">
            <div>
                <MenuButton class="flex max-w-xs items-center rounded-full bg-blue-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-5 focus:ring-offset-blue-800">

                    <div class="h-10 w-10 rounded-full text-white flex items-center justify-center   font-bold text-2xl line-height-0">{{ }}</div>

                </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']" @click="logout">Выйти</div>
                    </MenuItem>
                </MenuItems>
            </transition>
        </Menu>
        <div v-else>
            <router-link :to="{ name: 'login' }" class="text-md transition font-normal leading-6 text-gray-900 hover:text-blue-500 ">Авторизоваться</router-link>
        </div>
        <p v-if="isAuthenticated && user && user.name">Привет, {{ user.name }}</p>
        <div v-if="isAuthenticated">
            <!-- Контент после успешной авторизации -->
            <!-- <div>
                        <h1>Welcome to the Home Page!</h1>
                        <p v-if="role===1">You are logged in as an Admin.</p>
                        <p v-else-if="isUser">You are logged in as a User.</p>
                        <p v-else>You are not logged in.</p>
                        <router-link v-if="isAdmin" :to="{ name: 'admin-dashboard' }">Go to Admin Dashboard</router-link>
                        <router-link v-else-if="isUser" :to="{ name: 'user-dashboard' }">Go to User Dashboard</router-link>
                        <router-link v-else :to="{ name: 'login' }">Login</router-link>
                    </div> -->
            <!-- <button @click="logout">Выйти</button> -->
        </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen" is="div">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
                <a href="#" class="-m-1.5 p-1.5">
                    <span class="sr-only">Your Company</span>
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
                <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                    <span class="sr-only">Close menu</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                </button>

            </div>
            <div class="mt-6 flow-root">
                <div class="-my-6 divide-y divide-gray-500/10">
                    <div class="space-y-2 py-6">
                        <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
                    </div>

                    <div class="py-6">
                        <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
                    </div>
                </div>
            </div>
        </DialogPanel>
    </Dialog>
</header>
</template>

<script>
import {
    ref
} from 'vue';
/* eslint-disable */
import axios from 'axios';

import {
    Dialog,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DialogPanel
} from '@headlessui/vue';

import {
    MenuAlt2Icon,
    XIcon,
    ShoppingCartIcon,
    // Bars3Icon,
    // BellIcon,
    // XMarkIcon
} from '@heroicons/vue/outline';
import {
  
    mapGetters
} from 'vuex';
export default {
    name: 'v-header',

    components: {
        Dialog,
        DialogPanel,
        MenuAlt2Icon,
        XIcon,
        ShoppingCartIcon,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
    },

    data() {
        return {

            userNavigation: [{
                    name: 'Личный кабинет',
                    href: '/admin'
                },
                {
                    name: 'История заказов',
                    href: '/request'
                },
                {
                    name: 'Редактировать профиль',
                    href: '/edit-profile'
                }
            ],
            navigation: [{
                    name: 'Главная',
                    href: '/'
                },
                {
                    name: 'Каталог товаров',
                    href: '/catalog'
                },
                {
                    name: 'О нас',
                    href: '/about'
                },
                {
                    name: 'Новости',
                    href: '/news'
                },
                {
                    name: 'Контакты',
                    href: '/contacts'
                },
            ],
            mobileMenuOpen: false,

            scrolled: ref(false),

        };
    },
    methods: {
        handleScroll() {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            this.scrolled = scrollTop > 0;
        },
        logout() {
            // Метод для выхода пользователя
            // Удаление токена из локального хранилища
            // localStorage.removeItem('role');
            // Сброс состояния авторизации и роли в Vuex хранилище
            this.$store.commit('SET_AUTH', false);
            this.$store.commit('SET_ROLE', null);
            this.$router.push('/login');
        },
    },
    computed: {
        ...mapGetters(['CART', 'isAuthenticated', 'role', 'user']),

    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);

    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

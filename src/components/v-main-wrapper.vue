<template>
<div class="v-main-wrapper mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <!-- <vBreadcrumb /> -->
  <!-- <keep-alive> -->
    <router-link :to="{name: 'cart'}">
            <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
        </router-link>
    <router-view></router-view>
  <!-- </keep-alive> -->
  
</div>
</template>

<script>

import {

    mapGetters
} from 'vuex';


import '@/assets/tailwind.css';
export default {
    name: 'v-main-wrapper',
    components: {
 
    },
    props: {
        
    },
    data() {
        return {
            title: 'Main wrapper'
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            'CART'
        ])
    },
    methods: {

    },
    watch: {

    },
    mounted() {
    
    }
}
</script>

<style>

@import "../assets/styles/style.scss";

</style>

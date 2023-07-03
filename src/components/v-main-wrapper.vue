<template>
<div class="v-main-wrapper">
    {{ title }}
  <!-- <keep-alive> -->
    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
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
.v-main-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}
@import "../assets/styles/style.scss";

</style>

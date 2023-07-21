<template>
<div class="v-main-wrapper mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

<vHeader />
    <router-view></router-view>

  
</div>
</template>

<script>

import {
    mapGetters
} from 'vuex';


import '@/assets/tailwind.css';

import vHeader from '@/components/layouts/v-header'

export default {
    name: 'v-main-wrapper',
    components: {
        vHeader
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
            'PRODUCTS'
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

<template>
<div class="v-main-wrapper">
    {{ title }}

    <vCatalog />
    <vCart  
    v-if="CART.length"
    :cart_data="CART"
    />
</div>
</template>

<script>
import vCart from './v-cart';
import vCatalog from './v-catalog';
import { mapGetters } from 'vuex';

export default {
    name: 'v-main-wrapper',
    components: {
        vCart,
        vCatalog,
    },
    props: {},
    data() {
        return {
            title: 'Main wrapper'
        }
    },
    computed: {
        ...mapGetters([
            'CART'
        ])
    },
    methods: {

    },
    watch: {

    },
    mounted() {
        console.log('Hello i am alive!');
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

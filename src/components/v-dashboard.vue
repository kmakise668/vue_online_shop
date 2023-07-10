<template>
<div>
    <h1>Products</h1>
    <v-add-products-form></v-add-products-form>

    <ul>
        <li v-for="product in PRODUCTS" :key="product.article">
            {{ product.name }} - {{ product.price }}
        </li>
    </ul>
</div>
</template>

<script>
import vAddProductsForm from './v-add-products-form.vue';
import {
    mapActions,
    mapGetters
} from 'vuex';

export default {
    name: 'v-dashboard',
    components: {
        vAddProductsForm
    },
    computed: {
        products() {
            return this.$store.state.products;
        },
        ...mapGetters(['PRODUCTS'])

    },

    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API'
        ]),
    },
    mounted() {
        // this.GET_PRODUCTS_FROM_API()
        
        this.$store.dispatch('GET_PRODUCTS_FROM_API')
    },

};
</script>

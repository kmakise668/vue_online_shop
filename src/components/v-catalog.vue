<template>
<div class="v-catalog">
    <vCatalogItem v-for="product in PRODUCTS" :key="product.article" v-bind:product_data="product" @addToCart="addToCart"/>
</div>
</template>

<script>
import vCatalogItem from './v-catalog-item';
import {mapActions, mapGetters} from 'vuex'
export default {

    name: 'v-catalog',
    components: {
        vCatalogItem
    },
    props: {
   
    },
    data() {

        return {
         
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS'
        ])
    },
    methods: {
        ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
        ]),
        addToCart(data) {
        this.ADD_TO_CART(data)
        }
    },

    watch: {

    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
        // .then((response) =>{
        //   if(response.data) {
        //     console.log('Data arived!')
        //   }
        // })
    }
}
</script>

<style>
.v-catalog {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    margin-bottom: -3rem;
}

.v-catalog>* {
    width: calc(100% / 4 - 6rem);
    margin-right: 3rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 3rem;
    background-color: violet;
}
</style>

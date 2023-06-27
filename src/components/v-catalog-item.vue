<template>
<div class="v-catalog-item">
    <img :src="require('../assets/images/' + product_data.image)" alt="img">
    <h5 class="v-catalog-item__name">{{ product_data.name }}</h5>
    <div class="v-catalog-item__price">Price: {{ product_data.price }}</div>
    <button class="btn v-catalog-item__add_to_cart" @click="addToCart">Добавить в корзину</button>
</div>
</template>

    
    
<script>


export default {
    name: 'v-catalog-item',
    components: {

    },
    props: {
        product_data: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
      
        }
    },
    computed: {

    },
    methods: {
        addToCart() {
            this.$emit('addToCart', this.product_data)
        }
    },
    watch: {

    },
    mounted() {}
}
</script>
    
    
<style></style>

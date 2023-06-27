<template>
<div class="v-cart">
    <h1>Корзина</h1>
    <vCartItem v-for="item in cart_data" :key="item.article" :cart_item_data="item"  @update:cart_item_data="updateCartItemData"/>
</div>
</template>

<script>
import vCartItem from './v-cart-item'

export default {
    name: 'v-cart',
    components: {
        vCartItem
    },
    props: {
        cart_data: {
            type: Array,
            default () {
                return []
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

    },
    watch: {

    },
    mounted() {}
}
</script>

<style></style>

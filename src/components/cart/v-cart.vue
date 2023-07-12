<template>
<!-- <div class="v-cart">
    <h1>Корзина</h1>
    <p v-if="!CART.length">Корзина пустая</p>
    <v-cart-item v-for="(item, index) in CART" :key="item.id" :cart_item_data="item" @update:cart_item_data="item" @deleteFromCart="deleteFromCart(index)"
    @increment="increment(index)"
    @decrement="decrement(index)"
    />
    <div class="v-cart__total">
        <p>Итого:</p>
        <p>{{ cartTotalCost  }}</p>
    </div>
</div> -->


    <div class="v-cart">
    <h1>Корзина</h1>
    <p v-if="!CART.length">Корзина пустая</p>
    <v-cart-item v-for="(item, index) in CART" :key="item.id" :cart_item_data="item" @update:cart_item_data="item" @deleteFromCart="deleteFromCart(index)"
    @increment="increment(index)"
    @decrement="decrement(index)"
    />
    <div class="v-cart__total">
        <p>Итого:</p>
        <p>{{ cartTotalCost  }}</p>
    </div>
</div>

</template>



<script>
import vCartItem from './v-cart-item'
import {
    mapActions,
    mapGetters
} from 'vuex'

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
    emits: ['update:cart_item_data'],
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'CART'
        ]),
        // cartTotalCost() {
        //     let result = []

        //     if (this.CART.length) {
        //         for (let item of this.CART) {
        //         result.push(item.price * item.quantity)
        //     }
        //     result =   result.reduce(function(sum, el) {
        //        sum + el;
        //     })       
        //     return result;
        //     }else {
        //         return 0
        //     }

        // }
        cartTotalCost() {
            return this.CART.map(el => Math.floor(el.price) * el.quantity).reduce((acc, el) => acc = acc + el, 0);
            // return this.CART
        }

    },
    methods: {
        ...mapActions([
            'DELETE_FROM_CART',
            'INCREMENT_CART_ITEM',
            'DECREMENT_CART_ITEM',
            
        ]),
        updateCartItemData(newData) {

            const cart_item_data = this.cart_data.find(item => item.id === newData.id);
            cart_item_data.quantity = 1
        },
        deleteFromCart(index) {
            this.DELETE_FROM_CART(index)
        },
        increment(index) {
            this.INCREMENT_CART_ITEM(index)
        },
        decrement(index) {
            this.DECREMENT_CART_ITEM(index)
        }

    },
    watch: {

    },
    mounted() {}
}
</script>

<style></style>

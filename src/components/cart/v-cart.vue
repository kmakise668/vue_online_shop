<template>
<div class="v-cart">

    <h2 class="text-3xl mb-4 font-bold tracking-tight text-gray-900">Корзина</h2>
    <p class="text-gray-500 font-normal text-sm mb-12">Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /> Quidem architecto atque maiores praesentium aliquid ea laborum quisquam vero! Laborum, aut.</p>
    <vBreadcrumbs />
    <p v-if="!CART.length">Корзина пустая</p>
    <div v-else class="flex items-start">
        <div class="flex-1 bg-white ">
            <div class="v-cart-item uppercase text-sm font-medium tracking-wider text-gray-500 flex py-6 px-10 items-center border-b border-gray-200 border-solid mb-5">

                <div class="w-1/2 mr-20">
                    Наименование
                </div>
                <div class=" mr-10">
                    Количество
                </div>
                <div class="ml-auto w-20">
                    Действие
                </div>

            </div>

            <v-cart-item v-for="(item, index) in CART" :key="item.id" :cart_item_data="item" @update:cart_item_data="item" @deleteFromCart="deleteFromCart(index)" @increment="increment(index)" @decrement="decrement(index)" />

        </div>
        <div class="v-cart__total flex-2 overflow-hidden w-80 ml-8 sticky top-24 shadow-sm border-gray-100  border-2 bg-white h-auto py-6 rounded-md ">
            <div class="border-b border-solid border-gray-200 px-6 pb-6 text-gray-700  text-2xl font-medium">
                Условия заказа:
            </div>
            <CheckCircleIcon class="absolute z-[-1] top-[-40px] w-[8rem] text-blue-100  right-[-40px]" />
            <div class="relative px-6 pt-6">
                <div class="flex items-end mb-5">
                    <div class="text-gray-600">Количество:</div>
                    <div class="w-full border-dashed mb-1 border-stone-300 border-b"></div>
                    <div  class="text-blue-700 font-bold text-md inline-block whitespace-nowrap">{{ CART.length }} шт.</div>
                </div>
                <div  class="flex items-end">
                    <div class="text-gray-600">
                        Итого:
                    </div>
                    <div class="w-full border-dashed mb-1 border-stone-300 border-b"></div>
                    <div class="text-blue-700 font-bold text-xl inline-block whitespace-nowrap">{{ cartTotalCost  }} тг.</div>
                </div>
   
               <button class="btn v-catalog-item__add_to_cart z-2 relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Оформить заказ</button>
              
            </div>
        </div>
    </div>

</div>
</template>

<script>
import vCartItem from './v-cart-item'

import {
    CheckCircleIcon
} from "@heroicons/vue/outline";
import {
    mapActions,
    mapGetters
} from 'vuex'
// localStorage.clear();
export default {
    name: 'v-cart',
    components: {
        vCartItem,
        CheckCircleIcon
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
            const cart_item_data = this.cart_data.find((item) => item.id === newData.id);
            cart_item_data.quantity = 1;
            this.$emit('update:cart_item_data', cart_item_data);

            // Сохраняем обновленные данные корзины в localStorage
            localStorage.setItem('cart', JSON.stringify(this.CART));
        },
        deleteFromCart(index) {
            this.DELETE_FROM_CART(index)
            localStorage.setItem('cart', JSON.stringify(this.CART));
        },
        increment(index) {
            this.INCREMENT_CART_ITEM(index)
            localStorage.setItem('cart', JSON.stringify(this.CART));
        },
        decrement(index) {
            this.DECREMENT_CART_ITEM(index)
            localStorage.setItem('cart', JSON.stringify(this.CART));
        }

    },
    watch: {

    },
    mounted() {}
}
</script>

<style></style>

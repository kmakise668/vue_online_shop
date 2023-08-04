<template>
<div>

    <vBreadcrumb  :product-name="product.name || ''" />
    <div class="group  mt-10 v-product-single  grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">

        <div class="aspect-h-1 aspect-w-1  overflow-hidden rounded-md bg-white lg:aspect-none  lg:h-80">
            <img :src="product.image ? require('@/assets/images/' + product.image) : ''" class=" bg-white h-full w-full object-contain transform scale-55 object-center lg:h-full lg:w-full" />
        </div>
        <div class="mt-4 ">
            <div>
                <h3 class="text-4xl font-medium text-gray-700">

                    {{ product.name }}

                </h3>
                <p class="mt-5 mb-5 text-sm text-gray-500">Категория: <span class=" font-medium bg-stone-200 text-black py-0.5 px-2 rounded-sm text-base">{{ product.category }}</span></p>
            </div>

            <p class="text-grey-900 text-md font-normal">
                {{ product.description }}
            </p>

            <p class="text-sm font-medium text-gray-900">Цена: {{ product.price }}</p>
            <div class="flex ">
                <button class="btn v-product-single__add_to_cart transition ease-in-out flex items-center mr-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" @click="addToCart">
                    <ShoppingCartIcon class="text-white w-6 h-5 mr-1.5" /> Добавить в корзину
                </button>
                <button class="btn v-product-single__add_to_cart transition ease-in-out flex items-center justify-center border-2 border-blue-500 rounded-md bg-tranparent px-1.5 py-1.5 mt-4 text-sm font-semibold leading-6 text-blue shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" >
                    <HeartIcon class="text-blue-500 w-6 h-5 hover:text-white" />
                </button>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios';
import vBreadcrumb from '../v-breadcrumb.vue';
import {
    mapActions
} from 'vuex'
import {
    ShoppingCartIcon,
    HeartIcon
} from "@heroicons/vue/outline"
export default {
    name: 'v-product-single',
    components: {
        ShoppingCartIcon,
        HeartIcon,
        vBreadcrumb
    },
    props: {
   
    },

    data() {
        return {
            product: {},

        };
    },
    mounted() {
        const productId = this.$route.params.id;
        axios
            .get(`http://localhost:8089/api/products/${productId}`)
            .then((response) => {
                this.product = response.data;
                console.log(this.product.name);
            })
            .catch((error) => {
                console.error(error);
            });
       
            
    },
    methods: {
        ...mapActions(['addToCart']),
        addToCart() {
      const productWithQuantity = { ...this.product, quantity: 1 };
      this.$store.dispatch('ADD_TO_CART', productWithQuantity);
    },

    }
};
</script>

<style></style>

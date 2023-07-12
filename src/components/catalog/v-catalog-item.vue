<template>
<!-- <div class="v-catalog-item">
    <img :src="require('@/assets/images/' + product_data.image)" alt="img">
    <h5 class="v-catalog-item__name">{{ product_data.name }}</h5>
    <div class="v-catalog-item__price">Price: {{ product_data.price }}</div>
    <button class="btn v-catalog-item__add_to_cart" @click="addToCart">Добавить в корзину</button>

</div> -->

<div class="group relative v-catalog-item">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img :src="require('@/assets/images/' + product_data.image)" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
    </div>
    <div class="mt-4 flex justify-between">
        <div>
            <h3 class="text-sm text-gray-700">
                <a href="#">
                    <span aria-hidden="true" class="hover:bg-indigo-500" />
                    {{ product_data.name }}
                </a>
            </h3>
            <p class="mt-1 text-sm text-gray-500">Black {{ product_data.id }}</p>
        </div>
        <p class="text-sm font-medium text-gray-900"> {{ product_data.price }}</p>

    </div>
    <button class="btn v-catalog-item__add_to_cart flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="addToCart">Добавить в корзину</button>
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
        },

    },
    watch: {

    },
    mounted() {
        this.$emit('update:cart_item_data', {
            ...this.product_data,
            quantity: 1
        });
    }
}
</script>

<style></style>

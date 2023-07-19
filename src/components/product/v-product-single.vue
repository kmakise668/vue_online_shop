<template>
    <div class="group relative v-product-single">
      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img :src="product.image ? require('@/assets/images/' + product.image) : ''" class=" bg-white h-full w-full object-contain transform scale-55 object-center lg:h-full lg:w-full" />
  </div>
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" class="hover:bg-indigo-500" />
              {{ product.name }}
            </a>
          </h3>
          <p class="mt-1 text-sm text-gray-500">Black {{ product.id }}</p>
        </div>
        <p class="text-sm font-medium text-gray-900"> {{ product.price }}</p>
      </div>
      <button
        class="btn v-product-single__add_to_cart flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        @click="addToCart"
      >
        Добавить в корзину
      </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
export default {
  name: 'v-product-single',
  props: {
    productData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    axios
      .get(`http://localhost:7777/api/products/${productId}`)
      .then((response) => {
        // Обновляем локальное свойство 'product' полученными данными о продукте
        this.product = response.data;
        console.log(this.product.name);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
  </script>
  
  <style></style>
  
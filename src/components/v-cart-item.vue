<template>
    <div class="v-cart-item">
      <img :src="require('../assets/images/' + cart_item_data.image)" alt="img">
      <h5 class="v-cart-item__name">{{ cart_item_data.name }}</h5>
      <div class="v-cart-item__price">Price: {{ cart_item_data.price }}</div>
      <div class="v-cart-item__article">{{ cart_item_data.article }}</div>
      <div class="v-cart-item__quantity"></div>
      <button class="btn v-cart-item__remove_to_cart">Добавить в корзину</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "v-cart-item",
    props: {
      cart_item_data: {
        type: Object,
        default: () => ({})
      }
    },
    mounted() {
      this.$emit('update:cart_item_data', { ...this.cart_item_data, quantity: 1 });
    }
  };
  </script>
  
  <style></style>
  
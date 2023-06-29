<template>
    <div>
      home

      <vCatalog />
      <vCart />
    </div>
  </template>
  
  <script>
  import vCatalog from './v-catalog.vue'
  import vCart from './v-cart.vue'
  
  export default {
    name: 'v-home',
    components: {
      vCatalog,
      vCart
    },
    props: {},
    data() {
      return {}
    },
  }
  </script>
  
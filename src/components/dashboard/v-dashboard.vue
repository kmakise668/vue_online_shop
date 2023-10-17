<template>
  <div class="bg-gray-50 my-12 border-dashed border-2 rounded-xl p-8">

    <!-- <vAddProductsForm /> -->
    <VAdminProfile />

    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VAdminProfile from './v-admin-profile.vue';
// import vAddProductsForm from '../v-add-products-form.vue';

export default {
  components: {
    VAdminProfile
},
  data() {
    return {
    };
  },
 
 computed: {
    ...mapGetters(['user']), // Получите пользователя из хранилища Vuex
  },
  created() {
    const userId = localStorage.getItem('id');
    this.fetchUserData(userId);
  },
  methods: {
    ...mapActions(['fetchUserData']), // Вызовите действие для получения данных пользователя
  },
};
</script>

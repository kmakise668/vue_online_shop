<template>
  <div class="">
    <h1>Личный кабинет</h1>
    <p>Имя пользователя: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Роль: <span v-if="user.role === 1">Администратор</span></p>
    <vAddProductsForm />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex';
import vAddProductsForm from '../v-add-products-form.vue';

export default {
  components: {
    vAddProductsForm 
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

<!-- <template>
  <form @submit="registerUser">
    <input type="text" v-model="name" placeholder="Name" required>
    <input type="password" v-model="password" placeholder="Password" required>
    <input type="email" v-model="email" placeholder="Email">
    <button type="submit">Register</button>
    <p>{{ registrationMessage }}</p>
  </form>
</template> -->

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
  
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Зарегистрируйте свой аккаунт</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" @submit="registerUser">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Ваше имя</label>
          <div class="">
            <input id="name" name="name" type="text" autocomplete="name" v-model="name" required="" class="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email адрес</label>
          <div class="">
            <input id="email" name="email" type="email" autocomplete="email" v-model="email" required="" class="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Номер телефона</label>
          <div class="">
            <input id="phone" name="phone" type="text" autocomplete="phone" v-model="phone" required="" class="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
         
          </div>
          <div class="">
            <input id="password" name="password" type="password" v-model="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Зарегистрироваться</button>
        </div>
      </form>
      <p class="mt-10 text-center font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{ registrationMessage }}</p>
      <router-link to="/login">
      <p class="mt-4 text-center font-medium text-sm leading-6 text-gray-400 hover:text-indigo-500">Уже есть аккаунт?</p>
 </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      name: '',
      password: '',
      email: '',
      registrationMessage: '',
      phone: this.phone,
      role: 0    // Переменная для хранения сообщения о регистрации
    };
  },
  methods: {

    ...mapMutations(['SET_AUTH', 'SET_ROLE']), 
    async registerUser(event) {
  event.preventDefault();
  try {
    const response = await axios.post('http://localhost:7676/api/users', {
      name: this.name,
      password: this.password,
      email: this.email,
      phone: this.phone,
      role: '0'
    });
 
    // В данном случае, сервер возвращает только сообщение об успешной регистрации, без данных о роли
    // Если сервер вернул данные о роли, раскомментируйте следующие строки для сохранения роли через Vuex
    // const { role } = response.data;
    this.SET_AUTH(true);
    localStorage.setItem('role', 0);
   

    // Вместо сохранения роли через Vuex, просто перенаправим пользователя на страницу /dashboard
    this.$router.push('/dashboard');

    this.registrationMessage = response.data.message; // Сохранение сообщения в переменной
    console.log(response.data.message);
  } catch (error) {
    this.registrationMessage = error.response.data.message; // Сохранение сообщения об ошибке в переменной
    console.log(error.response.data.message);
  }
}

  },
  computed: {
    ...mapGetters(['isAuthenticated']) 
    },
};
</script>

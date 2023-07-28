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
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" @submit="registerUser">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" v-model="email" required="" class="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" v-model="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
      <p class="mt-10 text-center font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{ registrationMessage }}</p>
    {{ isAuthenticated }}
    {{ role }}
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
      registrationMessage: '' // Переменная для хранения сообщения о регистрации
    };
  },
  methods: {

    ...mapMutations(['SET_AUTH', 'SET_ROLE']), 
    async registerUser(event) {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:9999/api/users', {
          name: this.name,
          password: this.password,
          email: this.email,
          role: '0'
        });
     
        // Получаем роль пользователя из ответа сервера
        // const { role } = response.data;

        // Сохраняем данные входа (роль) через Vuex
        // this.$store.dispatch('setAuthAndRole', { isAuthenticated: true, role });
        this.SET_AUTH(true);
        // this.SET_ROLE(role);

        // Перенаправляем на админскую или пользовательскую панель в зависимости от роли
           this.$router.push('/dashboard');

        this.registrationMessage = response.data.message; // Сохранение сообщения в переменной
        console.log(response.data.message);
      } catch (error) {
        this.registrationMessage = error; // Сохранение сообщения в переменной
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']) 
    },
};
</script>

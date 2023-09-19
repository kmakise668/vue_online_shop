
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">

      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Войдите в свой аккаунт</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" @submit="login">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email адрес</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" v-model="email" required="" class="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Забыли пароль?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" v-model="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Войти</button>
        </div>
      </form>
      <p class="mt-10 text-center font-semibold text-sm leading-6 text-red-400">{{ errorMessage }}</p>
      <router-link to="/register">
      <p class="mt-4 text-center font-medium text-sm leading-6 text-gray-400 hover:text-indigo-500">Еще не регистрировались?</p>
 </router-link>
    </div>
  </div>
</template>

  <script>
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        res: '',
        errorMessage: ''
      };
    },
    methods: {
  async login(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/api/users/login', {
        email: this.email,
        password: this.password,
      });

      if (response.status === 200) {
        const accessToken = response.data.accessToken;

        // Устанавливаем куки с токеном
        document.cookie = `accessToken=${accessToken}; Secure; SameSite=Strict;`;

        const { role, id } = jwt_decode(accessToken);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);
        // alert(accessToken)
        this.$store.commit('SET_AUTH', true);
        this.$store.commit('SET_ROLE', role);
        // Выполняем действия на основе роли пользователя
        if (role === 1) {
         this.$router.push('/admin');
        } else {
          this.$router.push('/dashboard');
        }
      }
    } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      this.errorMessage = 'Ошибка: ' + error.response.data.message
    } else if (error.response.status === 500) {
      this.errorMessage = 'Внутренняя ошибка сервера';
    }
}






  },
},

  };
  </script>
  

  <style>.success-message {
    color: green;
    font-weight: bold;
  }
  
  /* Ваши стили для сообщений об ошибке */
  .error-message {
    color: red;
    font-weight: bold;
  }</style>
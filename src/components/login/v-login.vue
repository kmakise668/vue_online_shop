<template>
  <form @submit="login">
    <input type="email" v-model="email" placeholder="Email" required>
    <input type="password" v-model="password" placeholder="Password" required>
    <button type="submit">Login</button>
    <p>{{ res }}</p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      res: ''
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();

      try {
        const response = await axios.post('http://localhost:8888/api/users/login', { // Исправлен маршрут для авторизации
          email: this.email,
          password: this.password
        });

        if (response.status === 200) {
          this.res = 'Login successful';
          console.log('Login successful');

          // Save the token to localStorage or vuex store for future API requests
          const token = response.data.token;
          localStorage.setItem('token', token);

          // Redirect to the admin dashboard
          this.$router.push('/admin/dashboard');
        }
      } catch (error) {
        console.error(error);
        this.res = error.response.data.message;
      }
    }
  }
};
</script>

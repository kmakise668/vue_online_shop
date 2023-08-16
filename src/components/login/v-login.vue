<template>
    <form @submit="login">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
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
      };
    },
    methods: {
  async login(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8089/api/users/login', {
        email: this.email,
        password: this.password,
      });

      if (response.status === 200) {
        const accessToken = response.data.accessToken;

        // Устанавливаем куки с токеном
        document.cookie = `accessToken=${accessToken}; Secure; SameSite=Strict;`;

        const { role } = jwt_decode(accessToken);
        // localStorage.setItem('role', role);
        // alert(accessToken)
        this.$store.commit('SET_AUTH', true);
        this.$store.commit('SET_ROLE', role);
        // Выполняем действия на основе роли пользователя
        if (role === 1) {
         this.$router.push('/admin');
        } else {
          this.$router.replace('/dashboard');
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
},

  };
  </script>
  
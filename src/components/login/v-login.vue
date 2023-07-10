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
        const response = await axios.post('http://localhost:8080/api/users', {
          email: this.email,
          password: this.password
        });

        if (response.status === 200) {
          this.res = response.data.message;
          console.log('Login successful');
          // TODO: Дополнительные действия после успешной аутентификации
        }
      } catch (error) {
        console.error(error);
        this.res = error.response.data.message;
      }
    }
  }
};
</script>

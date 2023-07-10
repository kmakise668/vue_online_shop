<template>
  <form @submit="registerUser">
    <input type="text" v-model="name" placeholder="Name" required>
    <input type="password" v-model="password" placeholder="Password" required>
    <input type="email" v-model="email" placeholder="Email">
    <button type="submit">Register</button>
    <p>{{ registrationMessage }}</p>
  </form>
</template>

<script>
import axios from 'axios';

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
    async registerUser(event) {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/users', {
          name: this.name,
          password: this.password,
          email: this.email
        });
        this.registrationMessage = response.data.message; // Сохранение сообщения в переменной
        console.log(response.data.message);
        // TODO: Обработка успешной регистрации
      } catch (error) {
        console.error(error);
        // TODO: Обработка ошибок регистрации
      }
    }
  }
};
</script>

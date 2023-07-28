<template>
<form @submit="login">
    <input type="email" v-model="email" placeholder="Email" required>
    <input type="password" v-model="password" placeholder="Password" required>
    <button type="submit">Login</button>

</form>
</template>

<script>
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

// import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            res: '',
        };
    },
    methods: {
        // Ваш метод login
        async login(event) {
            event.preventDefault();
            try {
                const response = await axios.post('http://localhost:9999/api/users/login', {
                    email: this.email,
                    password: this.password,
                });
                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    const {
                        role
                    } = response.data; // Получаем роль из ответа сервера
                    console.log(response.data)
                    this.$store.commit('SET_AUTH', true);
                    this.$store.commit('SET_ROLE', role);
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role); // Сохраняем роль в состоянии Vuex
                    if (role === 1) {
                        this.$router.push('/admin');

                    } else {
                        this.$router.push('/dashboard');

                    }
                }
            } catch (error) {
                console.error(error);
                // Здесь можете обработать сообщение об ошибке
            }
        },

    },

};
</script>

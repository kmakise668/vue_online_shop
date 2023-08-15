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
                const response = await axios.post('http://localhost:8080/api/users/login', {
                    email: this.email,
                    password: this.password,
                });

                if (response.status === 200) {
                    const accessToken = response.data.accessToken;
                    const refreshToken = response.data.refreshToken;
                    console.log(accessToken)
                    // Сохраняем Refresh Token в Cookie с флагами httpOnly, secure и SameSite
                    // document.cookie = `accessToken=${accessToken}; path=/; secure; httpOnly; SameSite=strict`;
                    document.cookie = `refreshToken=${refreshToken}; path=/; secure; httpOnly; SameSite=strict`;
                    const {
                        role
                    } = jwt_decode(accessToken); // Расшифровываем токен и получаем роль
                    localStorage.setItem('role', role);
                    // localStorage.setItem('accessToken', accessToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                        // Сохраняем Access Token в куки
                   
          // Проверяем наличие и содержание токенов
                    if (accessToken) {
                        console.log('Access Token:', accessToken);
                        // Здесь можно выполнить другие действия, например, запросы к защищенным ресурсам
                    } else {
                        console.log('Access Token не найден');
                    }

                    if (refreshToken) {
                        console.log('Refresh Token:', refreshToken);
                        // Здесь можно выполнить другие действия, например, обновление Access Token
                    } else {
                        console.log('Refresh Token не найден');


                        
                }   // Декодирование токена
                
                    this.$store.commit('SET_AUTH', true);
                    this.$store.commit('SET_ROLE', role);

                    if (role === 1) {
                        this.$router.push('/admin');
                    } else {
                        this.$router.push('/dashboard');
                    }
                }
            } catch (error) {
                console.error(error);
                // Здесь можете обработать сообщение об ошибке, если необходимо
            }
        },
        

    },

};
</script>


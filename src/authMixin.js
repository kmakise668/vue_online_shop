import jwt_decode from 'jwt-decode';

export default {
    mounted() {
        // При монтировании каждого компонента проверяем наличие токена в куках
        const accessToken = this.getCookieValue('accessToken');
        if (accessToken) {
            this.$store.commit('SET_AUTH', true); // Устанавливаем состояние аутентификации
            const { role } = jwt_decode(accessToken); // Расшифровываем токен и получаем роль
            this.$store.commit('SET_ROLE', role); // Устанавливаем роль
        } else {
            this.$store.commit('SET_AUTH', false); // Если токена нет, снимаем состояние аутентификации
            this.$store.commit('SET_ROLE', null); // Сбрасываем роль
        }
    },
    methods: {
        getCookieValue(name) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(`${name}=`)) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        }
    }
};
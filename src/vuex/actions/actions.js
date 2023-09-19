import axios from 'axios';

export default {
    GET_PRODUCTS_FROM_API({ commit }) {
        return axios
            .get('http://localhost:5555/api/products') // Используйте метод get для получения данных
            .then((response) => {
                const products = response.data;
                products.forEach((item) => {
                    item.quantity = 1;
                });
                commit('SET_PRODUCTS_TO_STATE', products);
                return products; // Возвращаем данные продуктов
            })
            .catch((error) => {
                console.log(error);
                throw error; // Пробрасываем ошибку для обработки в вызывающем коде
            });
    },
    async addProduct({ commit, dispatch }, productData) {
        try {
            const response = await axios.post('http://localhost:5555/api/products', productData);
            const newProduct = response.data;
            commit('ADD_PRODUCT', newProduct); // Вызываем мутацию для добавления продукта в состояние
            await dispatch('GET_PRODUCTS_FROM_API'); // Вызываем действие для обновления списка товаров
            console.log('Товар успешно добавлен.');
        } catch (error) {
            console.error(error);
        }
    },

    ADD_TO_CART({ commit }, product) {
        commit('SET_CART', product);
    },
    INCREMENT_CART_ITEM({ commit }, index) {
        commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({ commit }, index) {
        commit('DECREMENT', index)
    },
    DELETE_FROM_CART({ commit }, index) {
        commit('REMOVE_FROM_CART', index)
    },
    async fetchUserData({ commit }, userId) {
        try {
            const response = await axios.get(`http://localhost:5555/api/users/${userId}`);
            commit('SET_USER', response.data);
        } catch (error) {
            console.error(error);
        }
    },
    logout() {
        // Метод для выхода пользователя
        // Удаление токена из локального хранилища
        localStorage.removeItem('role');
        // Сброс состояния авторизации и роли в Vuex хранилище
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        this.$store.commit('SET_AUTH', false);
        this.$store.commit('SET_ROLE', null);
        this.$router.push('/login');
    },
}
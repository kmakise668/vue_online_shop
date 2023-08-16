import axios from 'axios';

export default {
    GET_PRODUCTS_FROM_API({ commit }) {
        return axios
            .get('http://localhost:8080/api/products') // Используйте метод get для получения данных
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
            const response = await axios.post('http://localhost:8080/api/products', productData);
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
    GET_USER_DATA({ commit, state }) {
        if (state.user && state.user.token) {
            try {
                const response = axios.get('http://localhost:8080/api/users/login', {
                    headers: {
                        Authorization: `Bearer ${state.user.token}`,
                    },
                });
                const user = response.data;
                commit('SET_USER', user);
            } catch (error) {
                console.error(error);
                // Обработка ошибки
            }
        }
    },
    logout({ commit }) {
        // Выход пользователя из системы
        commit('SET_AUTH', false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        axios.defaults.headers.common['Authorization'] = null; // Убираем заголовок с токеном
        this.$router.push('/login');
      },
}
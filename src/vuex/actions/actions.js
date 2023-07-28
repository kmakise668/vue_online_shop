import axios from 'axios';

export default {
    GET_PRODUCTS_FROM_API({ commit }) {
        return axios
            .get('http://localhost:9999/api/products') // Используйте метод get для получения данных
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
            const response = await axios.post('http://localhost:9999/api/products', productData);
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
    // setAuthAndRole({ commit }, { isAuthenticated, role }) {
    //     commit('SET_AUTH', isAuthenticated);
    //     commit('SET_ROLE', role);
    // },

    // SET_AUTHENTICATED(state, isAuthenticated) {
    //     state.isAuthenticated = isAuthenticated;
    // },
    // SET_USER_ROLE(state, role) {
    //     state.userRole = role;
    // },

    // async GET_CURRENT_USER({ commit }) {
    //     try {
    //         // Ваш код для получения текущего пользователя с сервера (например, через axios)
    //         // После получения пользователя вызывайте мутацию для обновления состояния
    //         const response = await axios.get('http://localhost:9999/api/users');
    //         const user = response.data;
    //         commit('SET_CURRENT_USER', user);
    //     } catch (error) {
    //         // Если возникла ошибка, обновляем текущего пользователя на null
    //         commit('SET_CURRENT_USER', null);
    //     }
    // },
}
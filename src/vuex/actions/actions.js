import axios from 'axios';

export default {
    async addProduct({ commit }, productData) {
        try {
            const response = await axios.post('http://localhost:3001/api/products', productData);
            const newProduct = response.data;
            commit('ADD_PRODUCT', newProduct); // Вызываем мутацию для добавления продукта в состояние
        } catch (error) {
            console.error(error);
        }
    },
    GET_PRODUCTS_FROM_API({ commit }) {
        return axios
            .get('http://localhost:3001/api/products') // Используйте метод get для получения данных
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
    }
}
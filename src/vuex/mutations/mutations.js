export default {
    ADD_PRODUCT(state, product) {
        state.products.push(product);
    },
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products; //удалить надо
    },
    SET_CART: (state, product) => {

        if (state.cart.length) {
            let isProductExists = false;
            state.cart.map(function(item) {
                if (item.id === product.id) {
                    isProductExists = true;
                    item.quantity++
                }
            })
            if (!isProductExists) {
                state.cart.push(product)
            }
        } else {
            state.cart.push(product)
        }
    },
    SET_AUTH(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },
    SET_ROLE(state, role) {
        state.role = role;
    },
    SET_USER(state, user) {
        state.user = user
    },
    REMOVE_FROM_CART: (state, index) => {
        state.cart.splice(index, 1)
    },
    INCREMENT: (state, index) => {
        state.cart[index].quantity++
    },
    DECREMENT: (state, index) => {
        if (state.cart[index].quantity > 1) {
            state.cart[index].quantity--
        }
    },
    ADD_NOTIFICATION(state, notification) {
        state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state, notification) {
        const index = state.notifications.indexOf(notification);
        if (index !== -1) {
            state.notifications.splice(index, 1);
        }
    },
}
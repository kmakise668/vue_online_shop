export default {
    PRODUCTS(state) {
        return state.products;
    },
    CART(state) {
        return state.cart;
    },
    // CURRENT_USER(state) {
    //     return state.CURRENT_USER;
    // },
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    role(state) {
        return state.role;
    },
    isAdmin(state) {
        return state.role === 1;
    },
}
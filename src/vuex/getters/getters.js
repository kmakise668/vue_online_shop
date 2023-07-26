export default {
    PRODUCTS(state) {
        return state.products;
    },
    CART(state) {
        return state.cart;
    },
    CURRENT_USER(state) {
        return state.CURRENT_USER;
    },
    isAdmin(state) {
        // Здесь вы можете определить логику для проверки, является ли пользователь администратором
        // Например, если у пользователя есть поле "isAdmin" в объекте пользователя
        return state.CURRENT_USER && state.CURRENT_USER.isAdmin;
    },
    isAuthenticated(state) {
        // Возвращает true, если пользователь авторизован, и false в противном случае
        return state.CURRENT_USER !== null;
    },
}
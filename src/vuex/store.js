import { createStore } from 'vuex';
import actions from '@/vuex/actions/actions';
import mutations from '@/vuex/mutations/mutations';
import getters from '@/vuex/getters/getters';


const store = createStore({
    state: {
        products: [],
        cart: [],
        isAuthenticated: false,
        role: '',
        user: {},
        notifications: [],

    },
    mutations,
    actions,
    getters
});

export default store;
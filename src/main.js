import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import './assets/tailwind.css'
import vBreadcrumbs from './components/v-breadcrumb.vue';

import VueTheMask from 'vue-the-mask';


const app = createApp(App)


app.use(store)
app.use(router)
app.component('vBreadcrumbs', vBreadcrumbs);

app.use(VueTheMask);

app.mount('#app');



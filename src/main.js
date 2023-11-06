import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import './assets/tailwind.css'
import vBreadcrumbs from './components/v-breadcrumb.vue';
import api from './api/api.js';
import { createScrollRevealDirective } from 'vue-scroll-reveal'; // Import the named export

// import vNotifications from './components/notif/v-notifications.vue';



const app = createApp(App)

app.use(store)
app.use(router)
app.component('vBreadcrumbs', vBreadcrumbs);
const VueScrollReveal = createScrollRevealDirective(); // Create the directive

app.directive('scroll-reveal', VueScrollReveal);
// app.component('vNotifications', vNotifications)


app.mount('#app');

app.config.globalProperties.$api = api;
import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import './assets/tailwind.css'


const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
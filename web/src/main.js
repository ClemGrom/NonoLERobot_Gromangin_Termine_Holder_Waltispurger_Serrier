import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import toast from './plugins/toast'
import 'vue3-toastify/dist/index.css'

import ApiPlugins from './plugins/api.js'
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPersist)

import { useAuthStore } from "@/store/authStore.js";
const authStore = useAuthStore();

app.use(ApiPlugins, {
    baseURL: 'http://localhost:3320/'
})

app.use(toast)

app.use(router)

app.mount('#app')

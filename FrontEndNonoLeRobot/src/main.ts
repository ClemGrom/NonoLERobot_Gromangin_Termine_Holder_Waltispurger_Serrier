import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ApiPlugins from './plugins/api.js'

import toast from './plugins/toast'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(ApiPlugins, {
    baseURL: '', //base url de l'api
    apiKey: ''   //access token récupérer via authstore pinia
})

app.use(router)

app.mount('#app')

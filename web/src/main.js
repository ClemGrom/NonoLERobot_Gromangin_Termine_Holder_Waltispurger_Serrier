import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import toast from './plugins/toast'
import 'vue3-toastify/dist/index.css'

import ApiPlugins from './plugins/api.js'

const app = createApp(App)

app.use(ApiPlugins, {
    baseURL: 'http://localhost:3320/'
})

app.use(toast)

app.use(router)

app.mount('#app')

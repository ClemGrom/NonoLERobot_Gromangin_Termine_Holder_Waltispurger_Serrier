import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import toast from './plugins/toast'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(toast)

app.use(router)

app.mount('#app')

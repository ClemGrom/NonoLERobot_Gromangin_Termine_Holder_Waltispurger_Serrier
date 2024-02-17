import {toast} from 'vue3-toastify'

export default {
    install: (app) => {
        app.config.globalProperties.$toast = toast
    }
}
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            isConnected: false,
            user_email: ""
        }
    },
    actions: {
        setconnected(email) {
            this.isConnected = true;
            this.user_email = email;
        },
        disconnect() {
            this.isConnected = false;
            this.user_email = "";
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {storage: localStorage, paths:['user_email']}
        ]
    }
})
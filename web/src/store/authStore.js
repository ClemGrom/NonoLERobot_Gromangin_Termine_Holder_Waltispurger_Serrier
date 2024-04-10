import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            isConnected: false,
            user_email: "",
            accessToken: "",
            expireIn: ""
        }
    },
    actions: {
        setconnected(email, token, expire) {
            this.isConnected = true;
            this.user_email = email;
            this.accessToken = token;
            this.expireIn = expire;
        },
        disconnect() {
            this.isConnected = false;
            this.user_email = "";
            this.accessToken = "";
            this.expireIn = "";
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {storage: localStorage, paths:['user_email', 'accessToken', 'expireIn']}
        ]
    }
})
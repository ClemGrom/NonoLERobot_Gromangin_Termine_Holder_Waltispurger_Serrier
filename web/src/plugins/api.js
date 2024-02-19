import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

export default {
    install: (app, { baseURL }) => {
        const authStore = useAuthStore();
        const api = axios.create({baseURL});

        api.interceptors.request.use((config) => {
            config.headers['Authorization'] = `Bearer ${authStore.token}`;
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
        );
        app.config.globalProperties.$api = api;
    }
};
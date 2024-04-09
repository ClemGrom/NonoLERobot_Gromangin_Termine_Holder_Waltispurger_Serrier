import axios from 'axios';

export default {
    install: (app, { baseURL }) => {
        const api = axios.create({baseURL});

        api.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
        );
        app.config.globalProperties.$api = api;
    }
};
import axios from 'axios';

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

$axios.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default $axios;

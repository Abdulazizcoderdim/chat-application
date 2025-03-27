import axios from 'axios';

const $axios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_API,
  withCredentials: true,
});

export default $axios;

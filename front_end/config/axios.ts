import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ENV } from './env';

// Configuração global do axios
const axiosInstance = axios.create({
  baseURL: ENV.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Interceptor para requisições
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      const token = JSON.parse(auth)?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


// Interceptor para respostas
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Se receber 401, limpar dados de autenticação e redirecionar para login
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

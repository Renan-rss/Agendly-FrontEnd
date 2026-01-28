import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  config => {

    if (
      config.url.includes("/auth/login") ||
      config.url.includes("/usuarios/reset-senha")
    ) {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
